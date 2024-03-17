import {
	Image,
	ScrollView,
	Text,
	TextInput,
	SafeAreaView,
	View,
	Button,
	TouchableOpacity,
	Modal,
	FlatList,
	Platform,
} from "react-native";
import {
	Ionicons,
	MaterialIcons,
	AntDesign,
	Feather,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { fetchUserData } from "../Utils/Api";

export default function Home({ navigation, route }) {
	const { token } = route.params;

	const fetchDetails = async (token) => {
		try {
			const responseData = await fetchUserData(token);
			console.log("image data from Home:", responseData);
		} catch (error) {
			console.error("home error:", error);
		}
	};

	// useEffect(() => {
		const dataObject = fetchDetails(token);
		const { data } = dataObject;
		console.log("data array:", data);
	// }, []);

	// 	{
	// 		id: "1",
	// 		uri: "https://static.theprint.in/wp-content/uploads/2018/08/Modi-Ujjawala.jpg",
	// 	},
	// 	{
	// 		id: "2",
	// 		uri: "https://static.theprint.in/wp-content/uploads/2018/08/Modi-Ujjawala.jpg",
	// 	},
	// 	{
	// 		id: "3",
	// 		uri: "https://static.theprint.in/wp-content/uploads/2018/08/Modi-Ujjawala.jpg",
	// 	},
	// ];

	const renderItem = ({ item, index }) => {
		return (
			<View
				className="rounded-3xl p-2 m-4 border border-gray-400 "
				style={{
					backgroundColor: "#cdcdcd",
					elevation: 15,
					shadowRadius: 10,
					shadowColor: "#464646",
					shadowOpacity: "0.3",
					shadowOffset: { width: 0, height: 7 },
					marginBottom: index === data.length - 1 ? 100 : 0,
				}}
			>
				<Image
					style={{
						flex: 1,
						aspectRatio: 16 / 9,
						borderTopRightRadius: 18,
						borderTopLeftRadius: 18,
						borderBottomLeftRadius: 18,
						borderBottomRightRadius: 18,
					}}
					source={{ uri: item.uri }}
					resizeMode="cover"
				/>
				<View className="p-2 pt-3 pb-1">
					<Text className=" text-base font-bold ">Latitude :</Text>
					<Text className=" text-base font-bold ">Longitude :</Text>
				</View>
			</View>
		);
	};

	return (
		<View className="flex-1">
			<View className="p-3 pt-14 flex-row justify-between items-center ">
				<Text className="text-3xl pl-2 text-center font-bold text-black">
					My Images
				</Text>

				<View className="flex-row justify-between items-center">
					<TouchableOpacity>
						<AntDesign
							name="search1"
							size={24}
							color={"black"}
							style={{ padding: 2, paddingHorizontal: 8, paddingRight: 10 }}
						/>
					</TouchableOpacity>
				</View>
			</View>

			{data == undefined ? (
				<View className="flex-1 justify-center items-center ">
					<Text className="text-center text-xs text-gray-500">
						Click on button below to capture an image
					</Text>
				</View>
			) : (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					horizontal={false}
					fadingEdgeLength={100}
					showsVerticalScrollIndicator={false}
				/>
			)}

			{Platform.OS === "ios" ? (
				<TouchableOpacity
					onPress={() => navigation.navigate("CaptureImage")}
					activeOpacity={0.8}
					className="absolute right-8 bottom-8 bg-white rounded-full"
					style={{
						elevation: 80,
						shadowRadius: 20,
						shadowColor: "#0255c8",
						shadowOpacity: "0.8",
					}}
				>
					<AntDesign name="pluscircle" size={58} color="#0062f5" />
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					className="absolute bottom-6 right-8 rounded-full bg-white "
					style={{
						elevation: 15,
					}}
					onPress={() =>
						navigation.navigate("CaptureImage", token )
					}
				>
					<AntDesign name="pluscircle" size={58} color="#0062f5" />
				</TouchableOpacity>
			)}
		</View>
	);
}

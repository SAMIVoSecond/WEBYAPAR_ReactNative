import React, { useState, useEffect } from "react";
import {
	Button,
	Image,
	View,
	Platform,
	TouchableOpacity,
	Text,
	Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Exif } from "expo-media-library";
import { SubmitData } from "../Utils/Api";

export default function CaptureImage({ navigation, route }) {
	const [type, setType] = useState(CameraType.back);
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [location, setLocation] = useState(null);

	const [imagePadding, setImagePadding] = useState(0);
	const [ratio, setRatio] = useState("4:3");
	const { height, width } = Dimensions.get("window");
	const screenRatio = height / width;
	const [isRatioSet, setIsRatioSet] = useState(false);

	const token = route.params;

	const handleSubmit = async (imageData, latitude, longitude) => {
		try {
			console.log("Lat:", latitude, "Long:", longitude);
			const responseData = await SubmitData(imageData, latitude, longitude, token);
			console.log(
				"Submit successful with code:",
				responseData.status,
				"and Data:",
				responseData.data
			);

			navigation.navigate("Home");
		} catch (error) {
			console.error("Handle submit in captureImage:", error);
		}
	};

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			try {
				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
			} catch (error) {
				console.error("Error getting current position:", error);
				setErrorMsg("Error getting current position");
			}
		})();
	}, []);

	// const getLocationFromImage = async (uri) => {
	// 	try {
	// 		const { location } = await Exif.getExifAsync(uri);
	// 		return location;
	// 	} catch (error) {
	// 		console.error("Error extracting location from image:", error);
	// 		return null;
	// 	}
	// };

	useEffect(() => {
		async function getCameraStatus() {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(status == "granted");
		}
		getCameraStatus();
	}, []);

	const captureImage = async () => {
		if (camera) {
			let photo = await camera.takePictureAsync();
			// const location = await getLocationFromImage(capturedImage);
			if (location) {
				// console.log("Location from captured image:", location);
				handleSubmit(
					photo.uri,
					location.coords.latitude,
					location.coords.longitude
				);
			} else {
				console.log("No location data available for captured image");
			}
		}
	};

	const prepareRatio = async () => {
		let desiredRatio = "4:3"; // Start with the system default
		// This issue only affects Android
		if (Platform.OS === "android") {
			const ratios = await camera.getSupportedRatiosAsync();

			// Calculate the width/height of each of the supported camera ratios
			// These width/height are measured in landscape mode
			// find the ratio that is closest to the screen ratio without going over
			let distances = {};
			let realRatios = {};
			let minDistance = null;
			for (const ratio of ratios) {
				const parts = ratio.split(":");
				const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
				realRatios[ratio] = realRatio;
				// ratio can't be taller than screen, so we don't want an abs()
				const distance = screenRatio - realRatio;
				distances[ratio] = distance;
				if (minDistance == null) {
					minDistance = ratio;
				} else {
					if (distance >= 0 && distance < distances[minDistance]) {
						minDistance = ratio;
					}
				}
			}
			// set the best match
			desiredRatio = minDistance;
			//  calculate the difference between the camera width and the screen height
			const remainder = Math.floor(
				(height - realRatios[desiredRatio] * width) / 2
			);
			// set the preview padding and preview ratio
			setImagePadding(remainder);
			setRatio(desiredRatio);
			// Set a flag so we don't do this
			// calculation each time the screen refreshes
			setIsRatioSet(true);
		}
	};

	const setCameraReady = async () => {
		if (!isRatioSet) {
			await prepareRatio();
		}
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			// const location = await getLocationFromImage(image);
			if (location) {
				// console.log("Location from picked image:", location);
				handleSubmit(
					result.assets[0].uri,
					location.coords.latitude,
					location.coords.longitude
				);
			} else {
				console.log("No location data available for picked image");
			}
		}
	};

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}
	if (hasCameraPermission === null) {
		return (
			<View className="flex-1 justify-center items-center content-center">
				<Text>Waiting for camera permissions</Text>
			</View>
		);
	} else if (hasCameraPermission === false) {
		return (
			<View className="flex-1 justify-center items-center content-center">
				<Text>No access to camera</Text>
			</View>
		);
	} else {
		return (
			<View className="flex-1 bg-black">
				<Camera
					className="flex-1"
					style={{ marginTop: imagePadding, marginBottom: imagePadding }}
					type={type}
					onCameraReady={setCameraReady}
					ratio={ratio}
					ref={(ref) => {
						setCamera(ref);
					}}
				/>

				<View className="absolute items-center bottom-20 space-x-8 self-center flex-row">
					<TouchableOpacity
						activeOpacity={0.5}
						className=" bg-black rounded-full p-2"
						onPress={pickImage}
					>
						<Ionicons name="image-outline" size={32} color="white" />
					</TouchableOpacity>

					<TouchableOpacity
						activeOpacity={1}
						className=" bg-white border-2 border-black rounded-full p-8"
						onPress={captureImage}
					></TouchableOpacity>

					<TouchableOpacity
						activeOpacity={0.5}
						className=" bg-black rounded-full p-2"
						onPress={toggleCameraType}
					>
						<MaterialIcons name="cameraswitch" size={32} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

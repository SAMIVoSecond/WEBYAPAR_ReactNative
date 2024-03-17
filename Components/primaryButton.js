import { View, Text, Pressable } from "react-native";

export default function PrimaryButton({ outer, children, onPress }) {
	return (
		<View className=" rounded-xl w-full overflow-hidden " style={outer}>
			<Pressable
				className=" py-3 bg-primaryBlue"
				android_ripple={"#002861ff"}
				onPress={onPress}
			>
				<Text className=" text-white text-center font-bold text-base ">
					{children}
				</Text>
			</Pressable>
		</View>
	);
}

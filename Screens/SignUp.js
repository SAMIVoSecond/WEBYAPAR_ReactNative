import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Button,
} from "react-native";
import PrimaryButton from "../Components/primaryButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from "yup";
import { Formik } from "formik";
import { signUpUser } from "../Utils/Api";

// const PasswordSchema = Yup.object().shape({
// 	password: Yup.string()
// 		.min(4, "*Passsword Should be min of 4 characters")
// 		.max(16, "*Password should be max of 16 characters")
// 		.required("*Password is required"),

// 	email: Yup.string()
// 		.email("*Invalid email")
// 		.required("*Email is required"),

// 	name: Yup.string().required("*Name is required"),
// });

export default function SignUpScreen({ navigation }) {
	const [hidePassword, setHidePassword] = useState(true);

	const handleSubmit = async (values) => {
		try {
			const responseData = await signUpUser(values);
			console.log(
				"Signup successful, with status code:",
				responseData.status,
				"and data:",
				responseData.data
			);
			navigation.navigate("Login");
		} catch (error) {
			console.error("Signin failed:", error);
		}
	};

	return (
		<View className="flex-1">
			<Formik
				initialValues={{
					name: "",
					email: "",
					password: "",
					checked: true,
				}}
				onSubmit={(values) => {
					handleSubmit(values);
				}}
			>
				{({ handleChange, handleSubmit, values, touched, errors }) => (
					<View className=" flex-1 flex-col justify-evenly items-center w-full h-full bg-white p-3">
						<View className=" my-10 py-14 ">
							<Text className="text-2xl font-bold text-center text-primaryBlue">
								LOGO
							</Text>
						</View>

						<View className=" flex-col w-full px-4 justify-between py-24 mb-32">
							<View>
								<TextInput
									className=" border-b border-gray-200 py-2 px-2 text-base text-gray-700 "
									placeholder="Name"
									onChangeText={handleChange("name")}
									value={values.name}
								/>
							</View>
							{touched.name && errors.name && (
								<Text className="text-red-600 px-2 my-1 mb-[-7] text-xs">
									{errors.name}
								</Text>
							)}

							<View className="mt-4">
								<TextInput
									className="border-b border-gray-200 py-2 px-2 text-base text-gray-700"
									placeholder="Email"
									onChangeText={handleChange("email")}
									value={values.email}
								/>
							</View>
							{touched.email && errors.email && (
								<Text className="text-red-600 px-2 my-1 mb-[-7] text-xs">
									{errors.email}
								</Text>
							)}

							<View className="mt-4 flex-row justify-between border-b border-gray-200">
								<TextInput
									className="py-2 px-2 text-base text-gray-700"
									placeholder="Password"
									secureTextEntry={hidePassword}
									onChangeText={handleChange("password")}
									value={values.password}
								/>

								<TouchableOpacity
									onPress={() => setHidePassword(!hidePassword)}
									className="px-2 flex justify-center items-end py-2 "
								>
									<Text className=" text-right text-gray-500">
										{hidePassword ? "Show" : "Hide"}
									</Text>
								</TouchableOpacity>
							</View>

							{touched.password && errors.password && (
								<Text className="text-red-600 px-2 my-1 mb-[-7] text-xs">
									{errors.password}
								</Text>
							)}

							<View className="flex-row justify-start items-center px-2 my-4 ">
								<BouncyCheckbox
									size={14}
									fillColor={"#0062f5"}
									isChecked={values.checked}
									iconStyle={{ borderColor: "gray", borderRadius: 3, marginRight: -9 }}
									innerIconStyle={{ borderColor: "gray", borderRadius: 3 }}
									onPress={() => {
										values.checked = !values.checked;
										handleChange("checked");
									}}
									text="Remember me"
									textStyle={{
										color: "gray",
										fontSize: 14,
										textDecorationLine: "none",
									}}
								/>
							</View>
							<View className="my-2">
								<PrimaryButton
									onPress={() => {
										handleSubmit();
										// console.log(errors);
										// navigation.navigate("Login");
									}}
								>
									Sign In
								</PrimaryButton>
							</View>
						</View>
					</View>
				)}
			</Formik>

			<View className=" absolute bottom-7 flex-row p-4 items-center self-center">
				<Text>Already have an account?</Text>
				<TouchableOpacity
					className="px-2 "
					onPress={() => navigation.navigate("Login")}
				>
					<Text className="text-primaryBlue text-base font-semibold ">Login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

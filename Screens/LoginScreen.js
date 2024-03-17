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
} from "react-native";
import PrimaryButton from "../Components/primaryButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from "yup";
import { Formik } from "formik";
import { loginUser } from "../Utils/Api";

// const PasswordSchema = Yup.object().shape({
// 	password: Yup.string()
// 		.min(4, "*Passsword Should be min of 4 characters")
// 		.max(16, "*Password should be max of 16 characters")
// 		.required("*Password is required"),

// 	email: Yup.string()
//     .email("*Invalid email")
//     .required("*Email is required"),
// });

export default function LoginScreen({ navigation }) {
	const [hidePassword, setHidePassword] = useState(true);

	const handleLogin = async (values) => {
		try {
			const responseData = await loginUser(values);
			console.log(
				"Login successful, with status code:",
				responseData.status,
				"and Content:",
				responseData.data
			);
      navigation.navigate("Home", { token: responseData.data.token });
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<View className="flex-1">
			<Formik
				initialValues={{ email: "", password: "", checked: false }}
				onSubmit={(values) => {
					handleLogin(values);
				}}
			>
				{({ handleChange, handleSubmit, values, touched, errors }) => (
					<View className=" flex-1 flex-col justify-between items-center w-full h-full bg-white p-3">
						<View className=" py-24 ">
							<Text className="text-2xl font-bold text-center text-primaryBlue">
								LOGO
							</Text>
						</View>

						<View className=" flex-col w-full px-4 justify-between ">
							<View className=" py-24 mb-40 justify-between">
								<TextInput
									className=" border-b border-gray-200 py-2 px-2 text-base text-gray-700"
									placeholder="Email"
									onChangeText={handleChange("email")}
									value={values.email}
								/>
	
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
									<Text className="text-red-600 px-2 my-1 text-xs">
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

									<TouchableOpacity className=" px-3 ">
										<Text className=" text-primaryBlue">Forgot password?</Text>
									</TouchableOpacity>
								</View>

								<View className=" my-2">
									<PrimaryButton onPress={handleSubmit}>Login</PrimaryButton>
								</View>
							</View>
						</View>
					</View>
				)}
			</Formik>

			<View className=" absolute bottom-7 flex-row p-4  items-center self-center">
				<Text className="flex">Don't have an account yet?</Text>
				<TouchableOpacity
					className=" px-2 flex"
					onPress={() => navigation.navigate("SignUp")}
				>
					<Text className="text-primaryBlue text-base font-semibold ">Sign up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUp";
import Home from "./Screens/Home";
import CaptureImage from "./Screens/CaptureImage";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<>
			<StatusBar style="dark" />

			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName="Login"
				>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="SignUp" component={SignUpScreen} />
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="CaptureImage" component={CaptureImage} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

import axios from "axios";

const API_URL = "https://test.webyaparsolutions.com";

export const signUpUser = async (userData) => {
	const { name, email, password } = userData;
	const SigninData = {
		name: name.trim() || null,
		email: email.trim() || null,
		password: password.trim() || null,
	};
	console.log("Signin data from api:", SigninData);

	try {
		const response = await axios.post(`${API_URL}/auth/user/signup`, SigninData);
		return { status: response.status, data: response.data };
	} catch (error) {
		const { status, data } = error.response;
		throw { status, data };
	}
};

export const loginUser = async (userData) => {
	const { email, password } = userData;
	const LoginData = {
		email: email.trim() || null,
		password: password.trim() || null,
	};
	console.log("Login data from api:", LoginData);
	try {
		const response = await axios.post(`${API_URL}/auth/user/login`, LoginData);
		return { status: response.status, data: response.data };
	} catch (error) {
		const { status, data } = error.response;
		throw { status, data };
	}
};

export const SubmitData = async (imageData, latitude, longitude, token) => {
	console.log("Image data from api:", imageData);
	try {
		const response = await axios.post(
			`${API_URL}/form`,
			{
				latitude,
				longitude,
				imageData,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		return { status: response.status, data: response.data };
	} catch (error) {
		const { status, data } = error.response;
		throw { status, data };
	}
};

export const fetchUserData = async (token) => {
	try {
		const response = await axios.get(`${API_URL}/data`, {
			headers: {
				Authorization: token,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

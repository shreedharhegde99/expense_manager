import axios from "axios";
let baseUrl = "http://localhost:3000/api";

// Register the user

async function RegisterUser(
	name: String,
	username: any | String,
	password: any
) {
	let request = axios.post(`${baseUrl}/register`, {
		name,
		username,
		password,
	});

	let data = request.then((res) => res.data);

	return data;
}

// Login the user

async function LoginUser(username: any, password: any) {
	let request = axios.post(`${baseUrl}/login`, {
		username,
		password,
	});
	let data = request.then((res) => res.data);

	return data;
}

// Fetch the initial data available from the database after login

async function FetchUserData(token: any) {
	let request = axios.post(`${baseUrl}/user`, {
		token,
	});
	let data = request.then((res) => res.data);

	return data;
}

// adding Data to the user data
function AddData(
	type: String,
	date: any,
	amount: Number,
	detail: any,
	token: any
) {
	let request = axios.post(`${baseUrl}/user/add`, {
		token,
		type,
		amount,
		detail,
	});
	let data = request.then((res) => res.data);

	return data;
}

export { RegisterUser, LoginUser, FetchUserData, AddData };

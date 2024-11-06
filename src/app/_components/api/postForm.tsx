import axios from "axios";
export async function sendForm(
	email: string,
	phone: string,
	service: string,
	name: string
) {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/form`,
			{ email, phone, service, name }
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

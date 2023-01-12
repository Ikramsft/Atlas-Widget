import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Cookies from 'universal-cookie';
import { setValueToStorage } from "utils";

const cookies = new Cookies();

axios.defaults["content-type"] = "application/json";
export default NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			type: "credentials",
			async authorize(credentials, req) {
				const { email, password, api } = credentials;
				try {
					const URL = api == "live" ? "https://api.getatlas.us/v1.0/user/login" : "https://apib.getatlas.us/v1.0/user/login";
					const response = await axios.post(
						URL,
						{ email, password },
						{
							headers: { "content-type": "application/json" },
						}
					);
					const user = response.data;
					if (response.statusText === "OK" && response.status === 200) {
						return user;
					}
				} catch (error) {
					throw new Error(error.response.data.error.message);
				}
			},
		}),
		// ...add more providers here
	],
	pages: {
		signIn: "/dashboard",
		signOut: "/",
	},

	callbacks: {
		async jwt({ token, user }) {

			if (user) {
				token.accessToken = user?.result?.data.token;
				token.userId = user.result?.data?.user_id;
				token.userName = user.result?.data?.roles[0]?.name;
				token.companyId = user.result?.data?.roles[0]?.company?.id;
				token.companyName = user.result?.data?.roles[0]?.company?.name;
				token.locationId = user.result?.data?.roles[0]?.company?.locations?.id;
				token.locationName = user.result?.data?.roles[0]?.company?.locations?.name;
			}

			return token;
		},

		async session({ session, token, user }) {

			if (token) {

				session.accessToken = token.accessToken;
				session.user.userId = token.userId;
				session.user.userName = token.userName;
				session.user.companyId = token.companyId;
				session.user.companyName = token.companyName;
				session.user.companyLocationId = token.locationId;
				session.user.companyLocationName = token.locationName;
				// if (token?.version !== session?.version) {
				// 	return {
				// 		// You can ignore this if you don't need the previous data
				// 		...token,
				// 		// Return an error code 
				// 		error: "invalid-version",
				// 	}

				// }
			}
			try {
				console.log("nextauth ")

				setValueToStorage('userData', JSON.stringify(session));
				// if (typeof window !== 'undefined') {
				// 	// if (window.localStorage.getItem("userData") === 'undefined') {

				// 	// }
				// }
			} catch (e) {
				console.log("nextauth error", e)
			}

			return session;
		},
		async logout() {
			// this.authToken = null;
			// this.user = null;
			// localStorage.removeItem('user_data');
			if (typeof window !== 'undefined') {
				window.localStorage.clear();
				cookies.remove("user_data")
				cookies.add("reload")
			}
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
})
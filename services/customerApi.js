import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Cookies from 'universal-cookie';
import { getStorageValue } from "utils";
const cookies = new Cookies()
const userCookies = cookies.get('userData')
let localUser;
if (typeof window !== 'undefined') {
	if (window.localStorage.getItem("userData") !== 'undefined') {
		localUser = getStorageValue('userData')
	}
}
const userJson = localUser && JSON.parse(localUser);

const customerAdapter = createEntityAdapter({
	selectId: (post) => post.id,
	sortComparer: (a, b) => b.createdAt - a.createdAt,
});
export const customerApi = createApi({
	reducerPath: "customerApi",
	baseQuery: fetchBaseQuery({
		baseUrl: cookies.get('api') == 'live' ? process.env.NEXT_PUBLIC_LIVE_API_URL : process.env.NEXT_PUBLIC_API_URL,
		prepareHeaders: (headers) => {
			headers.set("content-type", "application/json");
			headers.set("accept", "application/json");
			// headers.set("Authorization", `Bearer ${userCookies?.accessToken || userJson?.accessToken}`);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getCustomerList: builder.mutation({
			query: (params) => {
				return {
					url: `/customers?filter={"search":{"field":"name","value":"${params.name || ''}","type":"partial","order":"desc"}}&page=${params.page}`,
					headers: { Authorization: `Bearer ${params?.accessToken}` }
				}
			},
		}),
		getCustomerDetails: builder.mutation({
			query: (params) => {
				return {
					url: `/customer/${params.id}`,
					headers: { Authorization: `Bearer ${params?.accessToken}` }
				}

			},
		}),
		updateCustomer: builder.mutation({
			query: (params) => ({

				url: `/customer/${params.id}`,
				method: 'POST',
				body: params?.payload,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'accept': 'application/json',
					headers: { Authorization: `Bearer ${params?.accessToken}` }
				},
			}),
		}),
	}),
});

export const { useGetCustomerListMutation, useCreateCustomerMutation, useGetCustomerDetailsMutation, useUpdateCustomerMutation } = customerApi;
const customerSelectors = customerAdapter.getSelectors((state) => state);
export { customerSelectors, customerAdapter };


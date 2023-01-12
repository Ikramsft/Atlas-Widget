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

const widgetAdapter = createEntityAdapter({
	selectId: (post) => post.id,
	sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const widgetApi = createApi({
	reducerPath: "widgetApi",
	baseQuery: fetchBaseQuery({
		baseUrl: cookies.get('api') == 'live' ? process.env.NEXT_PUBLIC_LIVE_API_URL : process.env.NEXT_PUBLIC_API_URL,
		prepareHeaders: (headers) => {
			headers.set("content-type", "application/json");
			headers.set("accept", "application/json");
			headers.set("Authorization", `Bearer ${userCookies?.accessToken || userJson?.accessToken}`);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getWidget: builder.mutation({
			query: (page) => {

				return `/widget?page=${page}`;
			},
		}),
		getWidgetDetails: builder.mutation({
			query: (id) => {

				return `/widget/${id}`;
			},
		}),
		createWidget: builder.mutation({
			query: (payload) => ({

				url: '/widget',
				method: 'POST',
				body: payload,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'accept': 'application/json'
				},
			}),
		}),
		updateWidget: builder.mutation({
			query: (params) => ({

				url: `/widget/${params.id}`,
				method: 'POST',
				body: params?.payload,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'accept': 'application/json'
				},
			}),
		}),
	}),
});

export const { useGetWidgetMutation, useCreateWidgetMutation, useGetWidgetDetailsMutation, useUpdateWidgetMutation } = widgetApi;
const widgetSelectors = widgetAdapter.getSelectors((state) => state);
export { widgetSelectors, widgetAdapter };

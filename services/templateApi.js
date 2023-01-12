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

const templateAdapter = createEntityAdapter({
	selectId: (post) => post.id,
	sortComparer: (a, b) => b.createdAt - a.createdAt,
});


export const templateApi = createApi({
	reducerPath: "templateApi",
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
		createTemplate: builder.mutation({
			query: (payload) => ({
				url: '/template',
				method: 'POST',
				body: payload,
			}),
		}),

		getTemplates: builder.mutation({
			query: (params) => {

				return {
					url: `/template`,
					headers: { Authorization: `Bearer ${params?.accessToken}` }
				}
			},
		}),
		getTemplateDetails: builder.mutation({
			query: (params) => {

				return {
					url: `/template/${params.id}`,
					headers: { Authorization: `Bearer ${params?.accessToken}` }
				}
			},
		}),
		deleteTemplate: builder.mutation({
			query: (params) => ({
				url: `/template/${params.id}`,
				method: 'DELETE',
				headers: { Authorization: `Bearer ${params?.accessToken}` }
			}),
		}),
		updateTemplate: builder.mutation({
			query: (params) => ({
				url: `/template/${params.id}`,
				method: 'POST',
				body: params?.payload,
				headers: { Authorization: `Bearer ${params?.accessToken}` }
			}),
		}),

	}),
});
export const { useLazyTemplateQuery,
	useCreateTemplateMutation,
	useGetTemplatesMutation,
	useDeleteTemplateMutation,
	useUpdateTemplateMutation,
	useGetTemplateDetailsMutation
} = templateApi;
const temlplateSelectors = templateAdapter.getSelectors((state) => state);
export { temlplateSelectors, templateAdapter };


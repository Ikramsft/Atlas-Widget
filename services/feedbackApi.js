import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'universal-cookie';

const feedbackAdapter = createEntityAdapter({
	selectId: (post) => post.id,
	sortComparer: (a, b) => b.createdAt - a.createdAt,
});

const cookies = new Cookies();

export const feedbackApi = createApi({
	reducerPath: "feedbackApi",
	baseQuery: fetchBaseQuery({
		baseUrl: cookies.get('api') == 'live' ? process.env.NEXT_PUBLIC_LIVE_API_URL : process.env.NEXT_PUBLIC_API_URL,
		prepareHeaders: (headers) => {
			headers.set("content-type", "application/json");
			headers.set("Referer", "https://appb.getatlas.us/");
			return headers;
		},
	}),
	endpoints: (builder) => ({
		reviewStatus: builder.mutation({
			query: (params) => ({
				url: `/review/request/${params.requestId}/status`,
				method: 'POST',
				body: params.payload,
				headers: {
					'Referer': 'https://appb.getatlas.us/',
				},
			}),
		}),
		getHashIds: builder.mutation({
			query: (params) => ({
				url: `/hashids`,
				method: 'POST',
				body: payload,
				headers: {
					'Referer': 'https://appb.getatlas.us/',
				},
			}),
		}),
	}),
});
export const { useLazyFeedbackQuery,
	useReviewStatusMutation,
	useGetHashIdsMutation

} = feedbackApi;
const feedbackSeletors = feedbackAdapter.getSelectors((state) => state);
export { feedbackSeletors, feedbackAdapter };

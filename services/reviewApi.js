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
const limit = 7

const previewAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const previewApi = createApi({
  reducerPath: "previewApi",
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
    getReviews: builder.mutation({
      query: (params) => {
        return {
          url: `/company/${params?.companyId || userCookies?.user?.companyId || userJson?.user?.companyId}/reviews?filter={${params.platform ? `"platforms":["${params.platform}"],` : ''}"rating":{"symbol":">","value":0},"order":"${params.order}","status":"active","date":{"from_date":"${params.fromDate}","to_date":"${params.toDate}"},"limit":${limit}}&page=${params.page}`,
          headers: { Authorization: `Bearer ${params?.accessToken || userJson?.accessToken}` }

        }
      },
    }),
    getReviewsData: builder.query({
      query: (params) => {
        return {
          url: `company/${params?.companyId || userCookies?.user?.companyId || userJson?.user?.companyId}/reviews?filter={${params.platform ? `"platforms":["${params.platform}"],` : ''}"rating":{"symbol":">","value":0},"order":"${params.order}","status":"active","date":{"from_date":"${params.fromDate}","to_date":"${params.toDate}"},"limit":${limit}}&page=${params.page}`,
          headers: { Authorization: `Bearer ${params?.accessToken || userJson?.accessToken}` }

        }

      },
    }),
    getplatforms: builder.query({
      query: (params) => {
        return {
          url: `/review/platform?page=${params.page}`,
          headers: { Authorization: `Bearer ${params?.accessToken || userJson?.accessToken}` }

        }
      },
    }),
    createRequest: builder.mutation({
      query: (params) => ({
        url: '/review/request',
        method: 'POST',
        body: params,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${params?.accessToken || userJson?.accessToken}`

        },
      }),
    }),
    createCustomer: builder.mutation({
      query: (params) => ({
        url: '/customer',
        method: 'POST',
        body: params,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${params?.accessToken || userJson?.accessToken}`
        },
      }),
    }),

    getRequestList: builder.mutation({
      query: (params) => {
        return {
          url: `/review/requests?filter={"mine":true}&page=${params.page}`,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${params?.accessToken || userJson?.accessToken}`
          },
        }
      },
    }),

    getDashboard: builder.mutation({
      query: (params) => {
        return {
          url: `/company/${params?.companyId || userCookies?.user?.companyId || userJson?.user?.companyId}/analytics?from_date=${params?.fromDate}&to_date=${params?.toDate}&report_type=${params?.report_type}`,
          headers: { Authorization: `Bearer ${params?.accessToken || userJson?.accessToken}` }

        }
      },
    }),
  }),
});
export const {
  useLazyReviewsQuery,
  useGetReviewsMutation,
  useCreateRequestMutation,
  useCreateCustomerMutation,
  useGetRequestListMutation,
  useReviewStatusMutation,
  useGetReviewsDataQuery,
  useGetplatformsQuery,
  useGetDashboardMutation
} = previewApi;
const previewSelectors = previewAdapter.getSelectors((state) => state);
export { previewSelectors, previewAdapter };


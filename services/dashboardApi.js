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

const dashboardAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
    getDashboardData: builder.query({
      query: (params) => {
        return {
          url: `/company/${params && params?.companyId || userCookies?.user?.companyId || userJson?.user?.companyId}/analytics?from_date=${params?.fromDate}&to_date=${params?.toDate}&report_type=${params?.report_type}`,
          headers: { Authorization: `Bearer ${params && params && params?.accessToken || userCookies?.accessToken}` }
        }


      },
    }),
    getReviewsData: builder.query({
      query: (params) => {

        return {
          url: `company/${params && params?.companyId || userCookies?.user?.companyId || userJson?.user?.companyId}/reviews?filter={${params.platform ? `"platforms":["${params.platform}"],` : ''}"rating":{"symbol":">","value":0},"order":"${params.order}","status":"active","date":{"from_date":"${params.fromDate}","to_date":"${params.toDate}"},"limit":7}&page=${params.page}`,
          headers: { Authorization: `Bearer ${params && params?.accessToken || userCookies?.accessToken}` }
        }

      },
    }),
    getDashboard: builder.mutation({
      query: (params) => {
        return {
          url: `/company/${params && params?.companyId || userCookies?.user?.companyId || userJson?.user?.companyId}/analytics?from_date=${params?.fromDate}&to_date=${params?.toDate}&report_type=${params?.report_type}`,
          headers: { Authorization: `Bearer ${params && params?.accessToken || userCookies?.accessToken}` }
        };
      },
    }),
  }),
});

export const { useGetDashboardMutation, useGetDashboardDataQuery, useGetReviewsDataQuery } = dashboardApi;
const dashboardSelectors = dashboardAdapter.getSelectors((state) => state);
export { dashboardSelectors, dashboardAdapter };


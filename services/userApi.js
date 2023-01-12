import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: cookies.get('api') == 'live' ? process.env.NEXT_PUBLIC_LIVE_API_URL : process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (params) => {
        return {
          url: "/user/register",
          method: "POST",
          body: params,
        };
      },
    }),
    signIn: builder.mutation({
      query: (params) => {
        return {
          url: "/user/login",
          method: "POST",
          body: params,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (params) => {
        return {
          url: "/user/password/forgot",
          method: "POST",
          body: params,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (params) => {
        return {
          url: "/user/password/reset",
          method: "POST",
          body: params,
        };
      },
    }),
    createCompany: builder.mutation({
      query: (params) => {
        return {
          url: "/company",
          method: "POST",
          body: params,
        };
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    createUser: builder.mutation({
      query: (params) => {
        return {
          url: "/register",
          method: "POST",
          body: params,
        };
      },
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useCreateCompanyMutation,
  useCreateUserMutation,
} = userApi;

import { LOGIN } from "./types";
import { api as index } from "../";

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LOGIN.LoginResponse, LOGIN.LoginRequest>({
			query: (newData) => ({
				url: "users",
				method: "POST",
				body: newData,
			}),
			invalidatesTags: ["auth"],
		}),
	}),
});
export const { useLoginMutation } = api;

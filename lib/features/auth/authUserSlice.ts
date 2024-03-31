import { asyncThunkCreator, buildCreateSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAuthUser } from "./api/authApi";

export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: {
        url: string;
        id_picture: string;
    };
}

export interface AuthApiResponse {
    data: User;
    token: string;
}
export interface CounterSliceState {
    status: "idle" | "loading" | "failed";
    authUser: User | null;
}

const initialState: CounterSliceState = {
    status: "idle",
    authUser: null,
};
const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const authUserSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: (create) => ({
        loginUser: create.asyncThunk<AuthApiResponse, void>(
            async () => {
                const response = await fetchAuthUser();
                console.log("fetchAuthUser-response: ", response);
                return response;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                rejected: (state, action) => {
                    state.status = "failed";
                    // state.error = action.payload ?? action.error;
                },
                fulfilled: (state, action: PayloadAction<AuthApiResponse>) => {
                    state.status = "idle";
                    state.authUser = action.payload.data;
                },
                // settled is called for both rejected and fulfilled actions
                settled: (state, action) => {
                    state.status = "idle";
                },
            },
        ),
    }),
    selectors: {
        selectAuthUser: (state) => state.authUser,
        selectStatusAuth: (state) => state.status,
    },
});

export const { loginUser } = authUserSlice.actions;
export const { selectAuthUser } = authUserSlice.selectors;

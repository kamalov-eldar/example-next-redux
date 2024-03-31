import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCount } from "../../counter/counterAPI";
import { AuthApiResponse } from "../authUserSlice";
import { fetchAuthUser } from "../api/authApi";
// import { userActions } from '../../user/slice/userSlice';

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmailAsyncThunk = createAsyncThunk<AuthApiResponse, void, { rejectValue: string }>(
    "login/loginByEmail",
    async (_, thunkApi) => {
        try {
            const response = await fetchAuthUser();
            console.log("fetchCount-response: ", response);
            if (!response.data) {
                throw new Error();
            }
            //localStorage.setItem('token', response.data.authData.token);
            // thunkApi.dispatch(userActions.setAuthUser(response.data));
            return response;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue("error");
        }
    },
);

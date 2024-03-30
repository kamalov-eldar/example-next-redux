// A mock function to mimic making an async request for data
import axios from "axios";
import { AuthApiResponse } from "./counterSlice";
//
export const fetchCount = async (amount = 1) => {
    const response = await axios.post<AuthApiResponse>(
        "https://6ede402e6a352dfb.mokky.dev/auth",
        { email: "dff@mail", password: "1234567" },
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        },
    );
    // const result = await response.json();

    return response.data;
};

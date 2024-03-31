import axios from "axios";
import { AuthApiResponse } from "../authUserSlice";
//
export const fetchAuthUser = async () => {
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

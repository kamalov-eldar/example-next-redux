"use client";

import { useEffect, useState } from "react";

import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    incrementIfOdd,
    selectCount,
    selectStatus,
    selectAuthUser,
    setAuthUser,
} from "@/lib/features/counter/counterSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./Counter.module.css";
import { useGetAuthUserQuery, useLoginByEmailMutation } from "@/lib/features/auth/authApiSlice";
import { useMutationHandlers } from "@/lib/useMutationHandlers";

export const Counter = () => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const loginData = { email: "dff@mail", password: "1234567" };
    const [loginByEmail, loginByEmailResponse] = useLoginByEmailMutation();

    /*   useMutationHandlers(loginByEmailResponse, (data) => {
        dispatch(setAuthUser(data));
    }); */

    /*  const { data, isLoading } = useGetAuthUserQuery(loginByEmailResponse.data?.token || "");
    console.log("data: ", data); */
    const handleAuth = (loginData: { email: string; password: string }) => {
        loginByEmail(loginData);
    };

    const status = useAppSelector(selectStatus);
    const [incrementAmount, setIncrementAmount] = useState("2");
    const authUser = useAppSelector((state) => state.counter.authUser);
    console.log("authUser: ", authUser);
    const incrementValue = Number(incrementAmount) || 0;

    return (
        <div>
            <div className={styles.row}>
                <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    -
                </button>
                <span aria-label="Count" className={styles.value}>
                    {count}
                </span>
                <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
                    +
                </button>

                <p>{authUser ? authUser.email : "authUser"}</p>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    type="number"
                    onChange={(e) => {
                        setIncrementAmount(e.target.value);
                    }}
                />
                <button className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    disabled={status !== "idle"}
                    onClick={() => dispatch(incrementAsync(incrementValue))}>
                    Async Thunk
                </button>
                <button
                    className={styles.asyncButton}
                    disabled={status !== "idle"}
                    onClick={() => handleAuth({ email: "dff@mail", password: "1234567" })}>
                    authApiSlice
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(incrementIfOdd(incrementValue));
                    }}>
                    Add If Odd
                </button>
            </div>
        </div>
    );
};

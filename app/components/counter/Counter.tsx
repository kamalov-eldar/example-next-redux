"use client";

import { useState } from "react";

import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    incrementIfOdd,
    selectCount,
    selectStatusCount,
} from "@/lib/features/counter/counterSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./Counter.module.css";
import { loginUser, selectAuthUser } from "@/lib/features/auth/authUserSlice";

export const Counter = () => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const statusCount = useAppSelector(selectStatusCount);
    const [incrementAmount, setIncrementAmount] = useState("2");
    const authUser = useAppSelector(selectAuthUser);

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
            </div>
            <span className={styles.row}>{authUser ? authUser.email : "authUser"}</span>
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
                    disabled={statusCount !== "idle"}
                    onClick={() => dispatch(incrementAsync(incrementValue))}>
                    Increment Async Thunk
                </button>
                <button className={styles.asyncButton} disabled={statusCount !== "idle"} onClick={() => dispatch(loginUser)}>
                    loginUser Async Thunk
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

import { useGetQuotesQuery } from "@/lib/features/quotes/quotesApiSlice";
import { useState } from "react";
import styles from "./Quotes.module.css";
import { useLoginByEmailMutation } from "@/lib/features/auth/authApiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectStatusCount } from "@/lib/features/counter/counterSlice";
import { loginUser, selectAuthUser } from "@/lib/features/auth/authUserSlice";

const options = [5, 10, 20, 30];

export const Quotes = () => {
    const dispatch = useAppDispatch();

    const [numberOfQuotes, setNumberOfQuotes] = useState(10);
    // Using a query hook automatically fetches data and returns query values
    const { data, isError, isLoading, isSuccess } = useGetQuotesQuery(numberOfQuotes);

    // const [loginByEmail, loginByEmailResponse] = useLoginByEmailMutation();
    const authUser = useAppSelector(selectAuthUser);
    const statusCount = useAppSelector(selectStatusCount);

    if (isError) {
        return (
            <div>
                <h1>There was an error!!!</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className={styles.container}>
                <h3>Select the Quantity of Quotes to Fetch: - Quotes Component</h3>
                {/*    {loginByEmailResponse.data && loginByEmailResponse.data.token} */}
                {authUser ? authUser.email : "authUser"}
                <button className={styles.asyncButton} disabled={statusCount !== "idle"} onClick={() => dispatch(loginUser())}>
                    loginUser Async Thunk
                </button>
                <select
                    className={styles.select}
                    value={numberOfQuotes}
                    onChange={(e) => {
                        setNumberOfQuotes(Number(e.target.value));
                    }}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {data.quotes.map(({ author, quote, id }, idx) => (
                    <blockquote key={id}>
                        {idx}
                        quote: &ldquo;{quote}&rdquo;
                        <footer>
                            author: <cite>{author}</cite>
                        </footer>
                    </blockquote>
                ))}
            </div>
        );
    }

    return null;
};

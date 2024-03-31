"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Quotes } from "../components/quotes/Quotes";
import { selectAuthUser } from "@/lib/features/counter/counterSlice";

export default function QuotesPage() {
    const authUser = useAppSelector(selectAuthUser);

    return (
        <>
            <h1>Quotes page</h1>
            <p>This page is intended to showcase RTK Query.</p>
            {authUser ? authUser.email : "authUser"}
            <Quotes />
        </>
    );
}

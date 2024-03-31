"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Quotes } from "../components/quotes/Quotes";

export default function QuotesPage() {
    const authUser = useAppSelector((state) => state.auth.authUser);

    return (
        <>
            <h1>Quotes page</h1>
            <p>This page is intended to showcase RTK Query.</p>
            {authUser ? authUser.email : "authUser"}
            <Quotes />
        </>
    );
}

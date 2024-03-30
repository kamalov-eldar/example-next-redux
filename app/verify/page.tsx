"use client";
import { useAppSelector } from "@/lib/hooks";

export default function VerifyPage() {
    const authUser = useAppSelector((state) => state.counter.authUser);
    console.log("authUser: ", authUser);

    return (
        <>
            <h1>Verify page</h1>
            <p>This page is intended to verify that Redux state is persisted across page navigations.</p>
            <p>{authUser ? authUser.email : "authUser"}</p>
        </>
    );
}

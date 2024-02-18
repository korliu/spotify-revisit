"use client"


import { useAccessToken, useVerifierAndChallenge } from "@/hooks/useAuthentication"
import { fetchServer } from "@/lib/request";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function LandingPage(){

    const router = useRouter();
    const handleLogin = () => {

        const accessToken = localStorage.getItem("accessToken");

        if (accessToken){
            // TODO: check if access token is still valid
            // redirect to home
            router.push("/revisit/home");
        } else {
            // redirect to auth
            router.push("/authentication");
        }
    
    }

    return (
        <>
            <h2>Hi there!</h2>
            <button onClick={handleLogin}>Log into spotify!</button>
        </>
    )

}

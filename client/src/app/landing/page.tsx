"use client"


import { useAccessToken, useVerifierAndChallenge } from "@/hooks/authentication"
import { fetchServer } from "@/lib/request";
import { useRouter } from "next/navigation";
import { fetchAccessToken } from '@/lib/auth';
import { useQuery } from "@tanstack/react-query";

export default function LandingPage(){

    console.log("helloo")

    const router = useRouter();
    const accessToken = useAccessToken("");


    const handleLogin = () => {
            
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

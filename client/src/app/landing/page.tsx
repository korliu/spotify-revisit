"use client"

import { useRouter } from "next/navigation";

export default function LandingPage(){

    const router = useRouter();
    const handleLogin = () => {

        const accessToken = localStorage.getItem("accessToken");

        if (accessToken){
            // redirect to home
            router.push("/revisit/home");
        } else {
            // redirect to auth
            router.push("/authentication");
        }
    
    }

    return (
        <>
            <div className = "landing-page">
                <h2>Hi there!</h2>
                <button onClick={handleLogin}>Log into spotify!</button>
            </div>

        </>
    )

}

"use client";

import { redirect } from "next/navigation"
import { useEffect, useState } from "react";


export function useAccessToken(initialValue: string){
    const [accessToken, setAccessToken] = useState(initialValue);

    useEffect( () => {

        const token = localStorage.getItem("accessToken") ?? "";

        setAccessToken(token);

    }, []);

    return accessToken;

}

export function useVerifierAndChallenge(){

    const [verifier, setVerifier] = useState("");
    const [challenge, setChallenge] = useState("");

    // console.log("Custom verifier getter");
    // console.log({codeVerifier: localStorage.getItem("codeVerifier"), codeChallenge: localStorage.getItem("codeChallenge")});
    

    useEffect( () => {
        const setVerifierAndChallenge = async () => {
            const codeVerifier = localStorage.getItem("codeVerifier") ?? "";
            const codeChallenge = localStorage.getItem("codeChallenge") ?? "";
    
            console.log("VERIFIER", codeVerifier, localStorage.getItem("codeVerifier"));
    
            // console.log("Custom verifier getter");
            // console.log({codeVerifier: localStorage.getItem("codeVerifier"), codeChallenge: localStorage.getItem("codeChallenge")});
            
            setVerifier(codeVerifier);
            setChallenge(codeChallenge);
        }

        setVerifierAndChallenge();


    }, []);

    // console.log(verifier, challenge)

    return {
        "verifier": verifier,
        "challenge": challenge,
    };

}
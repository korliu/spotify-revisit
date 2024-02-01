"use client";

import { fetchServer } from '@/lib/request';
import { redirect } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const redirectURI = process.env.REDIRECT_URI!;

export default function Authenticate() {

    const {data, isLoading, error } = useQuery({
        queryKey: ["authenticaion-keys"], 
        queryFn: fetchVerifierAndChallenge
    });
    
    if (isLoading) {
        console.log("Fetching code verifier and challenge");
        return <></>;
    };

    if (error){
        console.error("Error fetching code verifier and challenge");
        return <></>;
    };

    
    const {codeVerifier, codeChallenge} = data;

    if ((!codeVerifier) || (!codeChallenge)){
        console.error("Could not retrieve challenge and verifier")
    } else {

        localStorage.setItem("codeVerifier", codeVerifier);
        localStorage.setItem("codeChallenge", codeChallenge);
        
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", redirectURI);

        const scopes: string[] = ["user-read-private", "user-read-email"];
        params.append("scope", scopes.join(" "));

        params.append("code_challenge_method", "S256");
        params.append("code_challenge", codeChallenge);

        const searchParams = params.toString();
        
        const spotify_auth_url = `https://accounts.spotify.com/authorize?${searchParams}`

        redirect(spotify_auth_url);

    }
}


const fetchVerifierAndChallenge = async () => {

    console.log("Attempting to fetch verifier and challenge");
    const authRoute = `/authentication`;
    const response = await fetchServer('GET', authRoute);
    return await response.json();


}
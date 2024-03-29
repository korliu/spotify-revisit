"use client";
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation'

import { fetchServer } from '@/lib/request';
import { CLIENT_ID, REDIRECT_URI } from '@/lib/_constants';


export default function Authenticate() {

    const {data, isLoading, error } = useQuery({
        queryKey: ["authentication-keys"], 
        queryFn: fetchVerifierAndChallenge
    });
    
    if (isLoading) {
        return <>"Fetching code verifier and challenge"</>;
    };

    if (error){
        return <>"Error fetching code verifier and challenge"</>;
    };

    
    const {code_verifier, code_challenge} = data;

    if ((!code_verifier) || (!code_challenge)){
        console.error("Could not retrieve challenge and verifier")
    } else {

        localStorage.setItem("codeVerifier", code_verifier);
        localStorage.setItem("codeChallenge", code_challenge);
        
        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("response_type", "code");
        params.append("redirect_uri", REDIRECT_URI);

        const scopes: string[] = ["user-read-private", "user-read-email", "user-top-read"];
        params.append("scope", scopes.join(" "));

        params.append("code_challenge_method", "S256");
        params.append("code_challenge", code_challenge);

        const searchParams = params.toString();
        
        const spotify_auth_url = `https://accounts.spotify.com/authorize?${searchParams}`

        redirect(spotify_auth_url);

    }
}

const fetchVerifierAndChallenge = async () => {

    const authRoute = `/authentication`;
    const response = await fetchServer('GET', authRoute);
    return await response.json();

}
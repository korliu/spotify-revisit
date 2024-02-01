"use client";

import { useVerifierAndChallenge } from '@/hooks/authentication';
import { fetchAccessToken } from '@/lib/auth'
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react';


const clientId = process.env.SPOTIFY_CLIENT_ID!;
const redirectURI = process.env.REDIRECT_URI!;

export default function Main( { searchParams }: 
  { searchParams: { code: string | undefined } }){
    
    const accessCode: string | undefined = searchParams.code;

    const { verifier } = useVerifierAndChallenge();

    const codeAndVerifierExists: () => boolean = () => {
      console.log("checking if exists", accessCode, verifier, !!((accessCode) && (verifier)));
      return !!((accessCode) && (verifier));
    }

    const {data, isLoading, error, isFetched} = useQuery({
        queryKey: ["access-token", clientId, accessCode, verifier, redirectURI],
        queryFn: () => fetchAccessToken(clientId, accessCode!, verifier!, redirectURI), 
        // only runs when both exist
        enabled: codeAndVerifierExists()
    });


    if (!isFetched) {
      console.log("Waiting for verifier and challenge...");
      return <></>;
    }


    if (isLoading) {
      console.log("Fetching code verifier and challenge");
      return <></>;
    };

    if (error){
        console.error("Error fetching code verifier and challenge: ", error);
        return <></>;
    };


    const {access_token, refresh_token} = data;

    localStorage.setItem("accessToken",access_token);
    localStorage.setItem("refreshToken", refresh_token);

    redirect("/revisit/home")




  }


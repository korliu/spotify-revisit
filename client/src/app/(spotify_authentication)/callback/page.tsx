"use client";

import { useVerifierAndChallenge } from '@/hooks/useAuthentication';
import { fetchAccessToken } from '@/lib/auth'
import { useQuery } from '@tanstack/react-query';
import { redirect, useSearchParams } from 'next/navigation'
import { REDIRECT_URI } from '@/lib/_constants';

export default function Main(){

    const searchParams = useSearchParams();
    
    const accessCode: string | undefined = searchParams.get('code') ?? "";

    const { verifier } = useVerifierAndChallenge();

    const codeAndVerifierExists: () => boolean = () => {
      return !!((accessCode) && (verifier));
    }

    const {data, isLoading, error, isFetched} = useQuery({
        queryKey: ["query-access-token", accessCode, verifier, REDIRECT_URI],
        queryFn: async ()  => {
          const r = await fetchAccessToken(accessCode!, verifier!, REDIRECT_URI);
          const response = await r.json();

          return response;
        }, 
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


    const {access_token} = data;

    localStorage.setItem("accessToken",access_token);

    redirect("/revisit/home")

  }


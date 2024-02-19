"use client";

import { useQuery } from '@tanstack/react-query';
import { ReadonlyURLSearchParams, redirect, useSearchParams } from 'next/navigation'

import { REDIRECT_URI } from '@/lib/_constants';
import { fetchAccessToken } from '@/lib/auth';
import { useVerifierAndChallenge } from '@/hooks/useAuthentication';



export default function Main(){

    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    
    const accessCode: string | undefined = searchParams.get('code') ?? "";

    const { verifier } = useVerifierAndChallenge();

    const codeAndVerifierExists: () => boolean = () => {
      return !!((accessCode) && (verifier));
    }

    const {data, isLoading, error, isFetched} = useQuery({
        queryKey: ["query-access-token", accessCode, verifier, REDIRECT_URI],
        queryFn: async ()  => {
          const r: Response = await fetchAccessToken(accessCode!, verifier!, REDIRECT_URI);
          const response: {"access_token": string} = await r.json();

          return response;
        }, 
        // only runs when both exist
        enabled: codeAndVerifierExists()
    });


    if (!isFetched) {
      return <>"Waiting for verifier and challenge..."</>;
    }


    if (isLoading) {
      return <>"Fetching code verifier and challenge"</>;
    };

    if (error){
        console.error("Error fetching code verifier and challenge: ", error);
        return <></>;
    };

    // Assume data should be good and not undefined;
    const {access_token} = data!;

    localStorage.setItem("accessToken",access_token);

    redirect("/revisit/home")

  }


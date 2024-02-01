import { headers } from "next/headers";
import { fetchServer } from "./request";
// import { fetchRequest } from "./request";

export async function fetchAccessToken(
    clientId: string, authCode: string, codeVerifier:string, redirectURI: string
    ): Promise<any> {

    const tokenRoute = "/access_token";

    const data = {
        'client_id': clientId,
        'grant_type': "authorization_code",
        'code': authCode,
        'code_verifier': codeVerifier,
        'redirect_uri': redirectURI
    };

    const request = await fetchServer('POST', tokenRoute, {
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });

    // frontend request token
    // const method = 'POST';
    // const headers = {"Content-Type": "application/x-www-form-urlencoded"};
    // const body = new URLSearchParams(data);
    // const payload = {
    //     method: method,
    //     headers: headers,
    //     body: body,
    // }
    // const spotifyTokenEndpoint = "https://accounts.spotify.com/api/token";
    // const request = await fetch(spotifyTokenEndpoint, payload);

    return await request.json();
}
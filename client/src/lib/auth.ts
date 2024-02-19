import { headers } from "next/headers";
import { fetchServer } from "./request";
// import { fetchRequest } from "./request";


const clientId = process.env.SPOTIFY_CLIENT_ID!;
export async function fetchAccessToken(
    authCode: string, codeVerifier:string, redirectURI: string): Promise<Response> {

    const tokenRoute: string = "/access-token";

    const data: object = {
        'grant_type': "authorization_code",
        'client_id': clientId,
        'code': authCode,
        'code_verifier': codeVerifier,
        'redirect_uri': redirectURI
    };

    const response: Response = await fetchServer('POST', tokenRoute, {
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });

    return response
}

// not working yet
async function refreshAccessToken(refreshToken: string): Promise<Response> {

    const tokenRoute: string = "/access-token";

    const data = {
        'grant_type': "refresh_token",
        'client_id': clientId,
        'refresh_token': refreshToken,
    }

    const response = await fetchServer('POST', tokenRoute, {
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });

    return response
}

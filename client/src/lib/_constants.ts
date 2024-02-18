
export const CLIENT: string = process.env.CLIENT!;
export const SERVER: string = process.env.SERVER!;
export const CLIENT_ID: string = process.env.SPOTIFY_CLIENT_ID!;
export const REDIRECT_URI: string = process.env.REDIRECT_URI!;
export const TOKEN_EXPIRED_STATUS: 401 | "401" = 401;


export type UNAUTHORIZED_CODE = "401" | 401;
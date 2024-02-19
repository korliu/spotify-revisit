const server = process.env.SERVER!;

/**
    * @remarks 
    * Used to request from the backend server, use builtin `fetch()` when requesting from external URI
*/
export async function fetchServer(method: string, route: string, options: any = {}){


    const serverEndPoint = `${server}${route}`;
    const fetchOptions = {
        ...options, 
        method: method, 
        credentials: 'include',
    };

    const response = await fetch(serverEndPoint, fetchOptions);
    return response;

}

/**
    * @remarks 
    * Used to request from the backend server, to fetch from Spotify's API
    * Will always be a POST method to the backend. 
    * Data will always be application/json
    * Do not need to set the accessToken header
*/
export async function fetchServerSpotify(route: string, accessToken: string, options: any= {}){

    // console.log(`Fetching ${method} request from ${route} route`);
    const serverEndPoint: string = `${server}${route}`;

    const jsonHeaders: Headers = new Headers(options.headers ?? {});
    jsonHeaders.set("Content-Type", "application/json");

    const body = {
        ...options.body ?? {}, 
        "access_token": accessToken
    };

    const fetchOptions = {
        ...options,
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify(body),
        credentials: 'include',
    }

    const response = await fetch(serverEndPoint, fetchOptions);
    return response;


}

import axios from 'axios';
const server = process.env.SERVER!;


/**
    * @remarks 
    * Used to request from the backend server, use builtin `fetch()` when requesting from external URI
*/
export async function fetchServer(
    method: string, route: string, options: any = {}){

    // console.log(`Fetching ${method} request from ${route} route`);

    const URI = `${server}${route}`;
    const fetchOptions = {method: method, ...options};

    // console.log(fetchOptions);

    const response = await fetch(URI, fetchOptions);
    return response;

}

export function fetchSpotify(method: string, route: string, authToken: string){

}

// /**
//     * @remarks 
//     * only does post
// */
// async function fetchRequestJSON(route: string, body: any, 
//     headers: any = { "Content-Type": "application/json; charset=utf-8" }
// ){

//     const axiosInstance = axios.create({
//         withCredentials: true,
//         baseURL: server,
//     });

//     return axiosInstance.post(
//         route, body,
//         {
//             headers: headers
//         }
//     );


// };

// /**
//     * @remarks 
//     * unsure if works
// */
// async function fetchFormRequest(method: string, route: string, body: any, 
//     headers: any = { "Content-Type": "application/x-www-form-urlencoded" }){

//     const axiosInstance = axios.create({
//         withCredentials: true,
//         baseURL: server,
//     });

//     switch (method){
        
//         case 'GET': 

//             return axiosInstance.get(
//                 route, 
//                 {
//                     headers: headers
//                 }
//             );
            
//             break;

//         case 'POST':
//             return axiosInstance.post(
//                 route, body,
//                 {
//                     headers: headers
//                 }
//             );
//             break;

//         default:
//             throw new Error('Invalid method request!');
//             break;
            

//     };


// }
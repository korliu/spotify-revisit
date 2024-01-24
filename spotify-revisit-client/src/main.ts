import { redirectToAuthCodeFlow,getAccessToken } from "./lib/auth";


const clientId = "58068c9e86e64d2dbc08e4a5c8b8e1ab"; // Replace with your client id
const params = new URLSearchParams(window.location.search);
const code = params.get("code");


if (!code) {
    console.log("test");
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    // console.log(profile); // Profile data logs to console
    populateUI(profile);
}

async function fetchProfile(token: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    // console.log(result.json())
    return await result.json();
}

function populateUI(profile: UserProfile) {
    // console.log("profile", profile);
    document.getElementById("displayName")!.innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar")!.appendChild(profileImage);
    }
    document.getElementById("id")!.innerText = profile.id;
    document.getElementById("email")!.innerText = profile.email;
    document.getElementById("uri")!.innerText = profile.uri;
    document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url")!.innerText = profile.href;
    document.getElementById("url")!.setAttribute("href", profile.href);
    document.getElementById("imgUrl")!.innerText = profile.images[0]?.url ?? '(no profile image)';
}
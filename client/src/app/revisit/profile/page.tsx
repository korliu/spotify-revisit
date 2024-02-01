"use client";
import {useAccessToken} from "@/hooks/authentication";
import {useRouter} from "next/navigation";


const client = process.env.CLIENT!;
const server = process.env.SERVER!;

export default function ProfilePage(){

  const accessToken = useAccessToken("");

  console.log("profile page", accessToken);

  return (

    <>
      <div>
        <meta charSet="utf-8"/>
        <title>My Spotify Profile</title>
      </div>

      <div>
        <h1>Display your Spotify profile data</h1>

        {/* <ProfileData>{userProfile!}</ProfileData> */}

      </div>
    
    </>

  );

  }




function ProfileData( profile: UserProfile ) {

  const { 
    display_name: profile_name, 
    id: profile_id, 
    email: profile_email, 
    uri: profile_uri, 
    href: profile_href, 
    images: profile_images
  } = profile || {};

  const profile_image = profile_images[0]?.url ?? '(no profile image)';

  return (
    <div>
      <section id="profile">
        <h2>Logged in as {profile_name} </h2>

        <span id="avatar"></span>
        <h3>Avatar here..</h3>
        <ul>
            <li>User ID: {profile_id} </li>
            <li>Email: {profile_email} </li>
            <li>Spotify URI: {profile_uri} </li>
            <li>Link: {profile_href}</li>
            <li>Profile Image: {profile_image}</li>
        </ul>
      </section>
    </div>
  )

}

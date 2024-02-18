import React from "react"
import Image from "next/image";
import {noSpotifyImageFound} from "@/lib/defaults";
import useDataFetch from "@/hooks/useSpotifyDataFetch";
import { handleWaitingForData } from "@/lib/handlers";

// TODO: import CSS and react stuff

export default function UserProfile() {

  const {
    data, 
    isFetched, 
    isLoading, 
    error
  } = useDataFetch("profile-data", "/profile");

  const isUserProfile = (data: object) : data is UserProfile => {
    return (data.hasOwnProperty("top_genres") )
  }
  
  if (data && isUserProfile(data)) {

    const profileData: UserProfile = data as UserProfile;

    return (

      <ProfileData {...profileData} />
      
    )

  }

  else {
    return handleWaitingForData("profile-data", isFetched, isLoading, error );
  }

}


function ProfileData(profile: UserProfile) {

    const {
      display_name: displayName,
      id: profile_id,
      email: profile_email,
      uri: profile_uri,
      href: profile_href,
      images: profile_images
    } = profile || {};

    const profileImage = profile_images ? profile_images[0] : noSpotifyImageFound();


    const userImageComponent: React.JSX.Element = (
    
      <a href={profile_uri} target="_blank" 
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      
        <Image id="user-image"
          src={profileImage.url}
          width={50}
          height={50}
          alt={`Picture of ${displayName}`}
          placeholder="blur"
          blurDataURL={profileImage.url}
        />
        
      </a>
    )
  
    return (
      <section className="user-profile">

        <div id="user-name">
          {displayName ?? "Loading name..."}
        </div>

        <div>{userImageComponent}</div>
          
      </section>

    )
  
  }
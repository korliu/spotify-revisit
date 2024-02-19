import React from "react"
import Image from "next/image";
import {noSpotifyImageFound} from "@/lib/defaults";
import useDataFetch from "@/hooks/useSpotifyDataFetch";
import { handleWaitingForData } from "@/lib/handlers";
import { UserProfileData } from "@/lib/types";

// TODO: import CSS and react stuff

export default function UserProfile() {

  const {
    data, 
    isFetched, 
    isLoading, 
    error
  } = useDataFetch<UserProfileData>("profile-data", "/profile");

  const isUserProfile = (data: UserProfileData) : data is UserProfileData => {

    const dataType: undefined | string = data.type;
    return dataType !== undefined && dataType === "user";

  }
  
  if (data && isUserProfile(data)) {

    const profileData: UserProfileData = data;

    return (

      <ProfileData {...profileData} />
      
    )

  }

  else {
    return handleWaitingForData("profile-data", isFetched, isLoading, error );
  }

}


function ProfileData(profile: UserProfileData) {

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
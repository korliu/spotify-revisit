"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"; 
import { noSpotifyImageFound } from "@/lib/defaults";
import useDataFetch from "@/hooks/useSpotifyDataFetch";
import { handleError, handleWaitingForData } from "@/lib/handlers";
import { redirect, useRouter } from "next/navigation";
import { Lato } from "next/font/google";
import { interfaceIs } from "@/typeGuard";


export default function UserTopArtists() {

  const body = {
    "time_range": "medium_term",
    "limit": 3,
    "offset": 0,
  }

  const {
    data, 
    isFetched, 
    isLoading, 
    error
  } = useDataFetch("user-top-artists", "/user-top-artists", {body: body});

  const isTopArtistsData = (data: object): data is TopArtists => {

    const topArtistsData = (data as TopArtists);

    return (topArtistsData.hasOwnProperty("items") && topArtistsData.items[0].type === "artist")

  } 

  if (data && isTopArtistsData(data)){

    const topArtists: Artist[] = data.items;
  
    return (
      <section className="sidebar-top-artists-section"> 
          {topArtists.map(artist => ArtistDisplay(artist))}
      </section>
    )

  }

  else {
    return handleWaitingForData("sidebar-top-artists-section", isFetched, isLoading, error);

  }


}

function ArtistDisplay(artist: Artist){

  const artistName: string = artist.name ?? "No name found";
  const artistImage: SpotifyImage = artist.images ? artist.images[0] : noSpotifyImageFound();
  const artistLink: string = artist.external_urls.spotify;

  const imageStyle = {
    borderRadius: "50%",
    border: "1px solid purple",
    padding: "1px",
    
  }

  const artistImageComponent: React.JSX.Element = (
    
    <a href={artistLink} target="_blank" 
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    
      <Image src={artistImage.url}
        width={50}
        height={50}
        alt={`Picture of ${artistName}`}
        placeholder="blur"
        blurDataURL={artistImage.url}
        style={imageStyle}
      />
      
    </a>
  )


  return (
    <div className="sidebar-top-artists-item">

        {/* box for image */}
        <div id="artist-image">
          {artistImageComponent}
        </div>
        
        {/* outer box */}
        <div id="artist-name">
          {/* inner box to align artist name to the left */}
          <div style={{
            display:"flex",
            width:"95%",
            alignItems:"center",
            justifyContent:"left",
            fontSize:"larger"
          }}>
            {artistName}
          </div>

        </div>

    </div>
  )

}

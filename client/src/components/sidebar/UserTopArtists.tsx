"use client"

import Image from "next/image"; 
import { noSpotifyImageFound } from "@/lib/defaults";
import { handleWaitingForData } from "@/lib/handlers";
import { Artist, SpotifyImage, TopItems } from "@/lib/types";
import useDataFetch from "@/hooks/useSpotifyDataFetch";

import { IconContext } from "react-icons";
import { RiFolderMusicFill } from "react-icons/ri";
import { BsMusicNoteList } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";

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
  } = useDataFetch<TopItems<Artist>>("user-top-artists", "/user-top-artists", {body: body});

  const isTopArtistsData = (data: TopItems<Artist>): data is TopItems<Artist> => {

    return (data.hasOwnProperty("items") && data.items[0].type === "artist")

  } 

  if (data && isTopArtistsData(data)){

    const topArtists: Artist[] = data.items;
  
    return (
      <section className="sidebar-top-artists-section"> 
          {topArtists.map((artist: Artist) => ArtistDisplay(artist))}
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
  const artistGenres: string[] = artist.genres;

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
  );


  return (
    <div className="sidebar-top-artists-item" key={artist.uri ?? artistName}> 

        {/* box for image */}
        <div id="artist-image">
          {artistImageComponent}
        </div>
        
        {/* outer box */}
        <div id="artist-info">
          {/* inner box to align artist name to the left */}
          <div id="artist-name" style={{
            gridArea: "artist-name",
            alignSelf:"end",
            fontSize:"larger",
            fontWeight: "500"
          }}>
            {artistName}
          </div>

          
          <div id="genre-icon" style = {{
            gridArea:"genre-icon",
            marginRight: "0.5rem"
          }}>
            <IconContext.Provider value = {{ 
                color: "green", 
                size: "1.1rem",
                style: {
                  transform:"translate(25%)",
                }
              }}>
              <MdLibraryMusic />
            </IconContext.Provider>
          </div>

          <div id="artist-genres" style={{
            gridArea:"artist-genres",
            float:"left",
            wordWrap:"break-word",
            fontSize:"x-small",

          }}>
            {artistGenres.join(", ")}
          </div>

        </div>

    </div>
  )

}

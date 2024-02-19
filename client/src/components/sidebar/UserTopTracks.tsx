"use client"

import Image from "next/image"; 
import { noSpotifyImageFound } from "@/lib/defaults";
import { handleWaitingForData } from "@/lib/handlers";
import { Album, SpotifyImage, TopItems, Track } from "@/lib/types";
import useDataFetch from "@/hooks/useSpotifyDataFetch";


export default function UserTopTracks() {


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
  } = useDataFetch<TopItems<Track>>("user-top-tracks", "/user-top-tracks", {body: body});


  const isTopTracksData = (data: TopItems<Track>): data is TopItems<Track> => {


    return (data.hasOwnProperty("items")  && data.items[0].type === "track")

  } 
  
  if (data && isTopTracksData(data)){

    const topTracks: Track[] = data.items;

    return (
      <section className="sidebar-top-tracks-section"> 
          {topTracks.map(track => TrackDisplay(track))}
      </section>
    )

  }
  else {
    return handleWaitingForData("user-top-tracks", isFetched, isLoading, error);

  }


}

function TrackDisplay(track: Track){

  const trackTitle: string = track.name ?? "No name found";

  const trackAlbum: Album = track.album;
  const trackAlbumImage: SpotifyImage = trackAlbum.images ? trackAlbum.images[0] : noSpotifyImageFound();

  const trackArtist: string = track.artists[0].name ?? "No artist found";
  const trackLink: string = track.external_urls.spotify;
  const albumLink: string = trackAlbum.external_urls.spotify;

  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid purple',
    padding: "1px",
  }

  const albumImageComponent = (
    <a href={trackLink} target="_blank" 
    style={{ 
      display: "flex", alignItems: "center", justifyContent: "center" 
    }}>
      <Image 
      src={trackAlbumImage.url}
      width={50}
      height={50}
      alt={`Picture of ${trackTitle}`}
      placeholder="blur"
      blurDataURL={trackAlbumImage.url}
      style={imageStyle}
    />
    </a>
  )

  return (
    <div className="sidebar-top-tracks-item" key={trackTitle}>
          <div id="album-image">
            {albumImageComponent}
        </div>
        {/* outer box */}
        <div id="track-title">
          {/* inner box to align artist name to the left */}
          <div style={{
            display:"flex",
            width:"95%",
            alignItems:"left",
            justifyContent:"left",
            fontSize: "small"
          }}>
            {trackTitle}
          </div>
          <div style={{
            display:"flex",
            width:"90%",
            alignItems:"center",
            justifyContent:"right",
            fontSize: "x-small",
            float:"right",
            fontStyle: "italic",
            textAlign:"right"

          }}>
            {`Artist: ${trackArtist}`}
          </div>

        </div>
    </div>
  )

}

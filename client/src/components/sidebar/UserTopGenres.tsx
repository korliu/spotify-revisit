"use client";

import { handleWaitingForData } from "@/lib/handlers";
import { SpotifyImage } from "@/lib/types";
import useDataFetch from "@/hooks/useSpotifyDataFetch";



export default function UserTopGenres() {

    type ArtistInfo = {
        "artist_name": string,
        "artist_link": string,
        "artist_images": SpotifyImage[]
        
    };

    type GenreData = {
        "top_genres": Array<[string, number]>
        "genre_artists": Record<string, ArtistInfo[]>
    }

    
    const body = {
        "time_range": "medium_term",
        "limit": 20,
        "offset": 0,
      }

    const {
        data, 
        isFetched, 
        isLoading, 
        error
    } = useDataFetch<GenreData>("user-top-genres", "/user-top-genres", {body: body});



    const isGenresData = (data: GenreData): data is GenreData => {
        
        return (data.hasOwnProperty("top_genres")) && (data.hasOwnProperty("genre_artists"));
    }    

    if (data && isGenresData(data)) {

        type ArtistInfo = {
            "artist_name": string,
            "artist_link": string,
            "artist_images": SpotifyImage[]
            
        };
        const topGenres: Array<[string,number]> = data["top_genres"];
        const artistsToGenres: Record<string,ArtistInfo[]> = data["genre_artists"];


        return (
            <div className="user-top-genres"> 
                {(topGenres).map( 
                    (genre: any) => {
                        const genreName: string = genre[0];
                        const genreOccurences: number = genre[1];
                        const associatedArtists: ArtistInfo[] = artistsToGenres[genreName];
                        const artistNames: string = associatedArtists.map( 
                            (artist: ArtistInfo) => artist.artist_name 
                        ).join(", ");
                        
                        return (
                            <div className="top-genre-item" key={genreName}>
                                {genreName} ({genreOccurences}): {artistNames}
                            </div>
                        )
                    }
                )}
            </div>
        )
                

    } else {
        return handleWaitingForData("user-top-genres", isFetched, isLoading, error);
    }
}

// Copyright 2021-2023 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/bubble-chart


const genreBubbleChart = {

}
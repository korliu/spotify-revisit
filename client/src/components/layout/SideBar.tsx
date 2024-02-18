"use client";

import UserProfile from "@/components/sidebar/UserProfile";
import UserTopGenres from "@/components/sidebar/UserTopGenres";
import UserTopArtists from "@/components/sidebar/UserTopArtists";
import UserTopTracks from "@/components/sidebar/UserTopTracks";

import { useAccessToken } from "@/hooks/useAuthentication";

export default function Sidebar(){

    const accessToken = useAccessToken("");

    return (

        // TODO
        // profile stuff
        // profile spotify data stuff
        <>
            <UserProfile />
            <h3>Your Recent Top Artists</h3>
            <UserTopArtists />
            <h3>Your Recent Top Tracks</h3>
            <UserTopTracks />

            <h3>Your Recent Top Genres</h3>            
            <UserTopGenres />
        </>
        
        
        
    )
}
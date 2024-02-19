"use client";

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
            <div className="sidebar-content">

                <h3 className="sidebar-content-header">Your Recent Top Artists</h3>
                <UserTopArtists />
                <h3 className="sidebar-content-header">Your Recent Top Tracks</h3>
                <UserTopTracks />
                <h3 className="sidebar-content-header">Your Genre Profile!</h3>            
                <UserTopGenres />

            </div>


        </>
        
        
        
    )
}
"use client";

import type { Metadata } from "next";
import "../globals.css";

import SideBar from "@/components/layout/SideBar"
import TopBar from "@/components/layout/TopBar"

import { useAccessToken} from "@/hooks/useAuthentication";



export default function AppLayout({ children }: { children: React.ReactNode}) {
    // TODO redirect to authenticate if nothing

    const accessToken = useAccessToken("");
    return (


        <>
            <header className="topbar"><TopBar /></header>
            <section className="sidebar"><SideBar /></section>
            <section className="app-content">{children}</section>
        </>
  
    ); 
}

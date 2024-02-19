"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link'
import UserProfile from '../topbar/UserProfile';


export default function TopBar(){


    // LOGO     Nav     Settings/Logout


    const router = useRouter();

    return (
        <>
        <nav className="topbar-nav">


            <Link href="/revisit/home" className='nav-link'>Home</Link>
            <Link href="/revisit/home" className='nav-link'>AI</Link>

            <button onClick={() => {
                    localStorage.removeItem("accessToken");
                    router.push("/landing");
                
            }}>
                Logout
                </button>

        </nav>
 
        <UserProfile />
        </>
    )
}
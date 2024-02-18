"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link'


export default function TopBar(){


    // LOGO     Nav     Settings


    const router = useRouter();

    return (
        <nav className="top-bar-nav">


            <Link href="/revisit/home" className='nav-link'>Home</Link>
            <Link href="/revisit/home" className='nav-link'>AI</Link>

            <button onClick={() => {
                    localStorage.removeItem("accessToken");
                    router.push("/landing");
                
            }}>
                Click here to logout
                </button>

        </nav>
    )
}
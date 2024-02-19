import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider} from "@/components/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Revisit Dashboard",
  description: "Generated by create next app",
  keywords: "h",
};

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>

  ); 
}

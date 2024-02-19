"use client";

import { redirect } from "next/navigation";

export default function Main(){

  redirect("/landing");
  return (
    <h2> Welcome to my app! </h2>
  )
  
}


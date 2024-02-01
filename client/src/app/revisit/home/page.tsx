// import * as React from 'react'
import { redirect } from 'next/navigation'

const client = process.env.CLIENT!;
const server = process.env.SERVER!;

export default function Home(){
  
  // redirect("/revisit/profile")

  return (<><h2>Home page!</h2></>)

}

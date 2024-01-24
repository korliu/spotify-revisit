import * as React from 'react'




export default async function Home() {

  // want to check for code



  return (

    <>
      <script src="src/test.ts">      </script>
      <head>
        <meta charSet="utf-8"/>
        <title>My Spotify Profile</title>
      </head>

      <body>
        <h1>Display your Spotify profile data</h1>

        <section id="profile">
          <h2>Logged in as <span id="displayName"></span></h2>
          <span id="avatar"></span>
          <ul>
              <li>User ID: <span id="id"></span></li>
              <li>Email: <span id="email"></span></li>
              <li>Spotify URI: <a id="uri" href="#"></a></li>
              <li>Link: <a id="url" href="#"></a></li>
              <li>Profile Image: <span id="imgUrl"></span></li>
          </ul>
        </section>

      </body>
    
    </>

  );
}


function ProfileData( profile: UserProfile ) {

  const { 
    display_name: profile_name, 
    id: profile_id, 
    email: profile_email, 
    uri: profile_uri, 
    href: profile_href, 
    images: profile_images
  } = profile || {};

  const profile_image = profile_images[0]?.url ?? '(no profile image)';

  return (
    <div>
      <section id="profile">
        <h2>Logged in as {profile_name} </h2>

        <span id="avatar"></span>
        <h3>Avatar here..</h3>
        <ul>
            <li>User ID: {profile_id} </li>
            <li>Email: {profile_email} </li>
            <li>Spotify URI: {profile_uri} </li>
            <li>Link: {profile_href}</li>
            <li>Profile Image: {profile_image}</li>
        </ul>
      </section>
    </div>
  )

}

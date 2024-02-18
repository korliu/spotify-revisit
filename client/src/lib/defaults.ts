

export function noSpotifyImageFound(height: number = 50, width: number = 50): SpotifyImage{

    const noImageRef = process.env.PUBLIC_URL + "/default_images/no_image_available.png";

    const spotifyImage: SpotifyImage = {
        url: noImageRef,
        height: height,
        width: width,
    }

    return spotifyImage;

}
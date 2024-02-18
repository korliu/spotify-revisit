from collections import defaultdict
import requests

def get_genres_from_artists(artists_data: list) -> dict:

    if not artists_data:
        raise Exception("Artists data is empty.")

    genre_histogram = defaultdict(int)

    for artist in artists_data:

        artist_genres = artist["genres"]

        print(artist["name"], ":", artist_genres)

        for genre in artist_genres:
            genre_histogram[genre] = genre_histogram[genre] + 1


    return sorted(genre_histogram.items(), key=lambda item: item[1], reverse=True)


def get_genres_from_tracks(access_token: str, tracks_data: list) -> dict:

    artists_found = set()

    genre_artists = defaultdict(list)
    genre_histogram = defaultdict(int)

    main_artists = [track["artists"][0]["id"] for track in tracks_data]

    artist_ids = ",".join(main_artists)

    spotify_endpoint = "https://api.spotify.com/v1/artists"
    response: requests.Response = requests.get(
        spotify_endpoint, 
        headers={"Authorization": f"Bearer {access_token}"}, 
        params={"ids": artist_ids}
    )

    artists_data: dict = response.json()

    for artist in artists_data["artists"]:

        artist_name = artist["name"]
        artist_href = artist["href"]
        artist_genres = artist["genres"]

        print(artist["name"], ":", artist_genres)

        for genre in artist_genres:

            genre_histogram[genre] = genre_histogram[genre] + 1

            if artist_name not in artists_found:
                genre_artists[genre].append(artist_name)
                
        artists_found.add(artist_name)

    

    top_genres = sorted(genre_histogram.items(), key=lambda item: item[1], reverse=True)

    genre_data = {
        "top":  top_genres,
        "genre-artists": genre_artists
    }

    return genre_data
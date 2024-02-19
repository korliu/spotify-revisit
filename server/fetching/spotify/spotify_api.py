import requests
import json
from flask import abort

SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"




def fetch_profile_data(access_token: str) -> requests.Response:

    request_headers = token_header(access_token)
    route = "/me"

    spotify_endpoint = f"{SPOTIFY_API_BASE_URL}{route}"
    response = requests.get(spotify_endpoint,headers=request_headers)

    return response
        

# https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
def fetch_user_top_tracks(access_token: str, data) -> requests.Response:

    request_headers = token_header(access_token)
    route = "/me/top/tracks"


    time_range = data['time_range'] if ("time_range" in data) else "medium_term"
    limit = data["limit"] if ("limit" in data) else 5
    offset = data["offset"] if ("offset" in data) else 0
    
    query_params = {
        "time_range": time_range,
        "limit": limit,
        "offset": offset
    }


    spotify_endpoint = f"{SPOTIFY_API_BASE_URL}{route}"
    response = requests.get(spotify_endpoint, headers=request_headers, params=query_params)

    return response


def fetch_user_top_artists(access_token: str, data) -> requests.Response:

    request_headers = token_header(access_token)
    route = "/me/top/artists"


    time_range = data['time_range'] if ("time_range" in data) else "medium_term"
    limit = data["limit"] if ("limit" in data) else 5
    offset = data["offset"] if ("offset" in data) else 0
    
    query_params = {
        "time_range": time_range,
        "limit": limit,
        "offset": offset
    }


    spotify_endpoint = f"{SPOTIFY_API_BASE_URL}{route}"
    response = requests.get(spotify_endpoint, headers=request_headers, params=query_params)

    return response


def fetch_user_top_genres(access_token: str, data) -> requests.Response:

    request_headers = token_header(access_token)
    route = "/me/top/tracks"


    time_range = data['time_range'] if ("time_range" in data) else "medium_term"
    limit = data["limit"] if ("limit" in data) else 5
    offset = data["offset"] if ("offset" in data) else 0

    
    query_params = {
        "time_range": time_range,
        "limit": limit,
        "offset": offset
    }

    spotify_endpoint = f"{SPOTIFY_API_BASE_URL}{route}"
    response = requests.get(spotify_endpoint, headers=request_headers, params=query_params)

    return response

def token_header(access_token: str):
    return {"Authorization": f"Bearer {access_token}"}


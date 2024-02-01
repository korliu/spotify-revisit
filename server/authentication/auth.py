import random
import requests
import hashlib
import base64
import json

def generate_code_verifier(length: int):
    text = ""
    possible_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for i in range(length):

        random_char = random.choice(possible_chars)
        text += random_char

    return text


def generate_code_challenge(verifier: str):

    encoded_verifier = verifier.encode()

    data = hashlib.sha256()
    data.update(encoded_verifier)

    digest = data.digest()
    urlsafe_b64_encoding = base64.urlsafe_b64encode(digest)
    urlsafe_b64_encoding = urlsafe_b64_encoding.replace(b"=",b"")

    return urlsafe_b64_encoding


def get_access_token(data: dict) -> dict:
    '''
    Must include fields `client_id`, `user_code`, `verifier`, and `redirect_uri`
    '''

    spotify_token_endpoint = "https://accounts.spotify.com/api/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    try:
        r = requests.post(spotify_token_endpoint, data=data, headers=headers)
        r.raise_for_status()
        response = r.json()
        return response

    except Exception as error:

        raise Exception("Failed to retrieve access token from spotify", error)
        
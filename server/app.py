# module imports
import os
import datetime
from pathlib import Path

# flask imports
from flask import Flask, request, abort, session
from flask_cors import CORS
from dotenv import load_dotenv

# helper imports
from fetching import auth
from fetching import spotify_api
from lib import utils

# TODO 

app = Flask(__name__)
load_dotenv(Path("../.env"))
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(hours=8)


# TODO: add app website
client_origins = ["http://localhost:5173"]
CORS(app,origins=client_origins,supports_credentials=True) 

@app.errorhandler(429)
def app_exceeded_rate_limits(error):
    return {'error': error}, 429


@app.errorhandler(401)
def expired_token(error):
    # TODO handle refresh token in the backend, then send 201
    print("handler", error)
    print("401 error please refresh token")
    return {"error": "expired token"}, 401

@app.errorhandler(500)
def internal_error(error):
    # TODO handle refresh token in the backend, then send 201
    print("handler", error)
    return {"error": "server error"}, 500


@app.route("/")
def hello_world():
    return "<h1>Flask server running!</h1>"


@app.route("/authentication", methods=['GET'])
def authentication():

    verifier = auth.generate_code_verifier(128)
    challenge = auth.generate_code_challenge(verifier)

    return {
        'code_verifier': verifier,
        'code_challenge': challenge.decode()
    }


@app.route("/access-token", methods=['POST'])
def access_token():
    
    data: dict = request.get_json()
    r = auth.fetch_access_token(data)
    response = r.json()

    try:
        r.raise_for_status()

    except:
        abort(r.status_code)
    
    access_token: str = response['access_token']
    refresh_token: str = response['refresh_token']
    expires_in: int = int(response['expires_in'])
    
    expiration_time = datetime.datetime.now() + datetime.timedelta(seconds=expires_in)
    
    # set session token for refreshing if needed
    session[access_token] = {
        "refresh_token": refresh_token, 
        "expiration_time": expiration_time
    }

    return {
        'access_token': access_token,
    }


@app.route("/profile", methods=['POST'])
def profile():

    data = request.get_json()
    access_token = data.pop("access_token")
    r = spotify_api.fetch_profile_data(access_token)
    response = r.json()

    try:
        r.raise_for_status()

    except:
        abort(r.status_code, description=response['error']['message'])

    return response


@app.route("/user-top-artists", methods=['POST'])
def user_artists():

    data = request.get_json()
    access_token = data.pop("access_token")
    r = spotify_api.fetch_user_top_artists(access_token, data)
    response = r.json()

    try:
        r.raise_for_status()
    
    except:

        abort(r.status_code, description=response['error']['message'])

    return response

@app.route("/user-top-tracks", methods=['POST'])
def user_tracks():

    data = request.get_json()
    access_token = data.pop("access_token")
    r = spotify_api.fetch_user_top_tracks(access_token, data)
    response = r.json()

    try:
        r.raise_for_status()
    
    except:

        abort(r.status_code, description=response['error']['message'])

    return response


@app.route("/user-top-genres", methods = ['POST'])
def user_genres():
    data = request.get_json()
    # print("data is", data) 
    access_token = data.pop("access_token")
    r = spotify_api.fetch_user_top_genres(access_token, data)

    response = r.json()

    try:
        r.raise_for_status()
    
    except:
        # print("error response", response)
        abort(r.status_code, description=response['error']['message'])

    genre_data = utils.get_genres_from_tracks(access_token, response.get("items", list()))
    # print(genre_data)

    return {
        "top_genres": genre_data["top"],
        "genre_artists": genre_data["genre-artists"]
    }
# if __name__ == '__main__':
#     app.run()


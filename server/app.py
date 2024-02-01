import os
from flask import Flask, request
from flask_cors import CORS

from dotenv import load_dotenv
from pathlib import Path

from authentication import auth
from spotify import spotify_api

app = Flask(__name__)
CORS(app)

load_dotenv(Path("../.env"))
app.secret_key = os.getenv('FLASK_SECRET_KEY')


@app.route("/")
def hello_world():
    return "<h1>Flask server running!</h1>"


@app.route("/authentication", methods=['GET'])
def authentication():

    verifier = auth.generate_code_verifier(128)
    challenge = auth.generate_code_challenge(verifier)

    return {
        'codeVerifier': verifier,
        'codeChallenge': challenge.decode()
    }


@app.route("/access_token", methods=['POST'])
def access_token():
    # pass
    
    try: 

        data = request.get_json()
        response = auth.get_access_token(data)

        # print("response is", response)
        access_token = response['access_token']
        refresh_token = response['refresh_token']

        return {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    
    except Exception as err:
        raise Exception(err)


@app.get("/profile")
def profile():

    data = request.get_json()



    pass


# if __name__ == '__main__':
#     app.run()
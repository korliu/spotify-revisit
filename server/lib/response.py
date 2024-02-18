from Flask import Response



def json_response(status_code: int, json_data: str, headers: dict):

    response = Response(json_data, status=status_code, mimetype="application/json", headers=headers)
    return response
    
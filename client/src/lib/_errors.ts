
export class HTTPError extends Error {
    statusCode: number;
    errorMessage?: string;

    constructor( statusCode: number, errorMessage?: string) {
        super();
        this.name = "HTTPError";
        this.statusCode = statusCode;
        this.errorMessage = errorMessage ?? "";
    }
    
}


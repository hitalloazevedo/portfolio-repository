import { HttpError } from "./http.error";

export class LoadEnvError extends HttpError{
    constructor(public details?: string){
        super(500, "error to load .env variable.", details);
    }
}
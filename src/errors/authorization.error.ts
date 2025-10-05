import { HttpError } from "./http.error";

export class AuthorizationError extends HttpError{
    constructor(public details?: string){
        super(401, "authorization error.", details);
    }
}
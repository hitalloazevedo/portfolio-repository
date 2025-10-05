import { HttpError } from "./http.error";

export class NotFoundError extends HttpError{
    constructor(public details?: string){
        super(404, "resource not found.", details);
    }
}
import { HttpError } from "./http.error";

export class AlreadyExistsError extends HttpError{
    constructor(public details?: string){
        super(409, "already exists error.", details);
    }
}
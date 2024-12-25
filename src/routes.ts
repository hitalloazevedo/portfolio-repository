import { Request, Response, Router } from "express";
import { createProjectController } from "./useCases/projects/CreateProject";
import { getAllProjectController } from "./useCases/projects/GetAllProject";
import { updateProjectController } from "./useCases/projects/UpdateProject";
import { deleteProjectController } from "./useCases/projects/DeleteProject";

import { createUserController } from "./useCases/users/CreateUser";
import { authenticateUserController } from "./useCases/auth/AuthenticateUser";

const router = Router();

router.post('/projects', (request: Request, response: Response) => {
    createProjectController.handle(request, response);
});

router.get('/projects', (request: Request, response: Response) => {
    getAllProjectController.handle(request, response);
})

router.patch('/projects/:uuid', (request: Request, reponse: Response) => {
    updateProjectController.handle(request, reponse);
})

router.delete('/projects/:uuid', (request: Request, response: Response) => {
    deleteProjectController.handle(request, response);
})

// ===========================================================================

router.post('/signup', (request: Request, response: Response) => {
    createUserController.handle(request, response);
});

// ===========================================================================

router.post('/signin', (request: Request, response: Response) => {
    authenticateUserController.handle(request, response)
})

export { router };
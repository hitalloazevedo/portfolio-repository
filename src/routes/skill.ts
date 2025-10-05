import { Router, Response, Request, NextFunction } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { skillController } from "../controllers/skill.controller";

const skillRoutes = Router();

skillRoutes.get('/skills',  (request: Request, response: Response, next: NextFunction) => {
    skillController.findAll(request, response, next);
})

skillRoutes.post('/skills', authMiddleware.guard(), (request: Request, response: Response, next: NextFunction) => {
    skillController.create(request, response, next);
})

skillRoutes.delete('/skills/:title', authMiddleware.guard(), (request: Request, response: Response, next: NextFunction) => {
    skillController.delete(request, response, next);
})

// skillRoutes.patch('/skills/:uuid', authMiddleware.guard(), (request: Request, response: Response, next: NextFunction) => {
//     updateSkillController.handle(request, response);
// })

export { skillRoutes };
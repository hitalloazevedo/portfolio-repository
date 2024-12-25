import { Router, Response, Request } from "express";
import { authMiddlewareController } from "../middlewares/AuthMiddleware";
import { createSkillController } from "../useCases/skills/CreateSkill";

const skillRoutes = Router();

skillRoutes.post('/skills', authMiddlewareController, (request: Request, response: Response) => {
    createSkillController.handle(request, response);
})

export { skillRoutes };
import { Router, Response, Request, NextFunction } from "express";
import { createSkillController } from "../use-cases/skills/CreateSkill";
import { updateSkillController } from "../use-cases/skills/UpdateSkill";
import { getAllSkillsController } from "../use-cases/skills/GetAllSkills";
import { authMiddleware } from "../middlewares/auth.middleware";

const skillRoutes = Router();

skillRoutes.get('/skills',  (request: Request, response: Response) => {
    getAllSkillsController.handle(request, response);
})

skillRoutes.post('/skills', authMiddleware.guard(), (request: Request, response: Response) => {
    createSkillController.handle(request, response);
})

skillRoutes.patch('/skills/:uuid', authMiddleware.guard(), (request: Request, response: Response, next: NextFunction) => {
    updateSkillController.handle(request, response);
})

export { skillRoutes };
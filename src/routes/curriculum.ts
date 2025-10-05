import { Router, Request, Response, NextFunction } from "express";
import { curriculumController } from "../controllers/curriculum.controller";

const curriculumRouter = Router();

curriculumRouter.get(
  "/curriculum",
  (request: Request, response: Response, next: NextFunction) => {
    curriculumController.downloadCurriculum(request, response, next);
  }
);

export { curriculumRouter };

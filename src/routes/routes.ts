import { Router } from "express";
import { authRoutes } from "./auth";
import { projectRoutes } from "./project";
import { skillRoutes } from "./skill";
import { curriculumRouter } from "./curriculum";

const router = Router();

router.get("/", (request, response) => { response.status(200).json({ message: "backend is running..."}) })
router.use(authRoutes);
router.use(projectRoutes);
router.use(skillRoutes);
router.use(curriculumRouter)

export { router };
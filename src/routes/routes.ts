import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { projectRoutes } from "./projectRoutes";
import { skillRoutes } from "./skillRoutes";
import { curriculumRouter } from "./curriculumRoutes";

const router = Router();

router.get("/", (request, response) => { response.status(200).json({ message: "backend is running..."}) })
router.use(authRoutes);
router.use(projectRoutes);
router.use(skillRoutes);
router.use(curriculumRouter)

export { router };
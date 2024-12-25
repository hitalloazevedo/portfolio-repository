import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { projectRoutes } from "./projectRoutes";
import { skillRoutes } from "./skillRoutes";

const router = Router();

router.use(authRoutes);
router.use(projectRoutes);
router.use(skillRoutes);

export { router };
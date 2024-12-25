import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { projectRoutes } from "./projectRoutes";

const router = Router();

router.use(authRoutes);
router.use(projectRoutes);

export { router };
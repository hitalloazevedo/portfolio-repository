import { AuthController } from "../controllers/auth.controller";
import { CurriculumController } from "../controllers/curriculum.controller";
import { ProjectController } from "../controllers/project.controller";
import { SkillController } from "../controllers/skill.controller";
import { UserController } from "../controllers/user.controller";
import { Skill } from "../entities/skill";
import { MemoryCache } from "../infra/cache/memory-cache.service";
import { JwtTokenService } from "../infra/jwt/jwt-token.service";
import { MongoProjectRepository } from "../repositories/implementations/project.mongo";
import { MongoSkillRepository } from "../repositories/implementations/skill.mongo";
import { MongoDBUsersRepository } from "../repositories/implementations/user.mongo";
import { AuthUseCase } from "../use-cases/auth.usecase";
import { ProjectUseCase } from "../use-cases/project.usecase";
import { SkillUseCase } from "../use-cases/skill.usecase";
import { UserUseCase } from "../use-cases/user.usecase";
import { loadControllers } from "./router-loader";

export const router = loadControllers([
  () => new ProjectController(new ProjectUseCase( new MongoProjectRepository())),
  () => new UserController(new UserUseCase( new MongoDBUsersRepository())),
  () => new AuthController(new AuthUseCase( new MongoDBUsersRepository(), JwtTokenService.getInstance())),
  () => new SkillController(new SkillUseCase( new MongoSkillRepository(MemoryCache.getInstance()))),
  () => new CurriculumController(),
]);

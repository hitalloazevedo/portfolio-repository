import { GetAllSkillsController } from "./GetAllSkillsController";
import { GetAllSkillsUseCase } from "./GetAllSkillsUseCase";
import { mongoDBSkillsRepository } from "../../../shared/singletonsInstances";

const getAllSkillsUseCase = new GetAllSkillsUseCase(
    mongoDBSkillsRepository
);

const getAllSkillsController = new GetAllSkillsController(
    getAllSkillsUseCase
);

export { getAllSkillsController };
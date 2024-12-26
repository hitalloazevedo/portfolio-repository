import { MongoDBSkillsRepository } from "../../../repositories/implementations/MongoDBSkillsRepository";
import { GetAllSkillsController } from "./GetAllSkillsController";
import { GetAllSkillsUseCase } from "./GetAllSkillsUseCase";

const mongoSkillsRepository = new MongoDBSkillsRepository();

const getAllSkillsUseCase = new GetAllSkillsUseCase(
    mongoSkillsRepository
);

const getAllSkillsController = new GetAllSkillsController(
    getAllSkillsUseCase
);

export { getAllSkillsController };
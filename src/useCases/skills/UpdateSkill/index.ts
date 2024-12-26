import { UpdateSkillController } from "./UpdateSkillController";
import { UpdateSkillUseCase } from "./UpdateSkillUseCase";
import { MongoDBSkillsRepository } from "../../../repositories/implementations/MongoDBSkillsRepository";

const mongoSkillsRepository = new MongoDBSkillsRepository();

const updateSkillUseCase = new UpdateSkillUseCase(
    mongoSkillsRepository
)

const updateSkillController = new UpdateSkillController(
    updateSkillUseCase
)

export { updateSkillController };
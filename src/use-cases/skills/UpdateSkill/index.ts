import { UpdateSkillController } from "./UpdateSkillController";
import { UpdateSkillUseCase } from "./UpdateSkillUseCase";
import { mongoDBSkillsRepository } from "../../../shared/singletonsInstances";

const updateSkillUseCase = new UpdateSkillUseCase(
    mongoDBSkillsRepository
)

const updateSkillController = new UpdateSkillController(
    updateSkillUseCase
)

export { updateSkillController };
import { UpdateProjectController } from "./UpdateProjectController";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";
import { mongoDBProjectsRepository } from "../../../shared/singletonsInstances";

const updateProjectUseCase = new UpdateProjectUseCase(
    mongoDBProjectsRepository
)

const updateProjectController = new UpdateProjectController(
    updateProjectUseCase
)

export { updateProjectController };
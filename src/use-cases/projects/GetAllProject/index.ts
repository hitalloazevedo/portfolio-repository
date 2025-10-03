import { GetAllProjectController } from "./GetAllProjectController";
import { GetAllProjectUseCase } from "./GetAllProjectUseCase";
import { mongoDBProjectsRepository } from "../../../shared/singletonsInstances";

const getAllProjectUseCase = new GetAllProjectUseCase(
    mongoDBProjectsRepository
)

const getAllProjectController = new GetAllProjectController(
    getAllProjectUseCase
)

export { getAllProjectController };
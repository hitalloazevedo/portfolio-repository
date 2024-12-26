import { ISkillsRepository } from "../../../repositories/ISkillsRepository";
import { IUpdateSkillRequestDTO } from "./UpdateSkillDTO";

export class UpdateSkillUseCase {
    constructor (
        private skillsRepository: ISkillsRepository
    ) {}

    async execute(uuid: string, data: Partial<IUpdateSkillRequestDTO>) {
        const _id = await this.skillsRepository.getIdbyUuid(uuid);
        await this.skillsRepository.update(_id, data);
    }
}
import { ISkillsRepository } from "../../../repositories/skills.repository";
import { IUpdateSkillRequestDTO } from "./UpdateSkillDTO";
import { svgToBase64 } from "../../../utils/svgImageHandler";

export class UpdateSkillUseCase {
    constructor (
        private skillsRepository: ISkillsRepository
    ) {}

    async execute(uuid: string, { title, description, svg_image }: Partial<IUpdateSkillRequestDTO>) {
        const _id = await this.skillsRepository.getIdbyUuid(uuid);

        let base64Svg: string | undefined;

        if (svg_image) {
            base64Svg = svgToBase64(svg_image);
        }

        await this.skillsRepository.update(_id, { title, description, svg_image: base64Svg});
    }
}
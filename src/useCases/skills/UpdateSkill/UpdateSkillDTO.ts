import { Skill } from "../../../entities/Skill";

export interface IUpdateSkillRequestDTO extends Skill {
    uuid: string;
}
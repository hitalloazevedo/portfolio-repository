import { Skill } from "../../../entities/skill";

export interface IUpdateSkillRequestDTO extends Skill {
    uuid: string;
}
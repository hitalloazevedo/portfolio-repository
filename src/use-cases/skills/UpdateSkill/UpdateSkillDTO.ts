import { Skill } from "../../../entities/kill";

export interface IUpdateSkillRequestDTO extends Skill {
    uuid: string;
}
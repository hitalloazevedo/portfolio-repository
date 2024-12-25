import { Skill } from "../../entities/Skill";
import { ISkillsRepository } from "../ISkillsRepository";
import { MongoDBRepository } from "../MongoDBRepository";
import mongoose, { Schema } from "mongoose";

const SkillSchema: Schema = new mongoose.Schema({
    uuid: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    svg_image: { type: String, required: true},
});

const SkillModel = mongoose.model<Skill>('Skill', SkillSchema);


export class MongoDBSkillsRepository extends MongoDBRepository implements ISkillsRepository {

    constructor () {
        super();
    }

    async save(skill: Skill): Promise<void> {
        try {

            await this.connect();

            const newSkill = new SkillModel({
                uuid: skill.uuid,
                title: skill.title,
                description: skill.description,
                svg_image: skill.svg_image
            })

            await newSkill.save();

            console.log("Skill saved");

        } catch(err) {
            console.log(err);
        } finally {
            await this.closeConnection();
        }
    }

    async findByTitle(title: string): Promise<Skill | undefined> {
        try {

            await this.connect();

            const response = await SkillModel.findOne({ title: title});

            if (response){
                return new Skill({ 
                    title: response.title,
                    description: response.description,
                    uuid: response.uuid,
                    svg_image: response.svg_image
                 })
            }

        } catch (err) {
            console.log("Error looking for project: ", err);
        } finally {
            await this.closeConnection();
        }
    }
     
    async findAll(): Promise<Skill[] | undefined> {
        return
    }

    async update(_id: unknown, newData: Partial<Skill>): Promise<void> {
        return
    }

    async getIdbyUuid(uuid: string): Promise<unknown> {
        return
    }

    async delete(_id: unknown): Promise<void> {
        return
    }

}
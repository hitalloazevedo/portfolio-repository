import { Skill } from "../../entities/Skill";
import { ISkillsRepository } from "../ISkillsRepository";
import mongoose, { Schema } from "mongoose";


const SkillSchema: Schema = new mongoose.Schema({
    uuid: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    svg_image: { type: String, required: true},
});


const SkillModel = mongoose.model<Skill>('Skill', SkillSchema);

export class MongoDBSkillsRepository implements ISkillsRepository {

    async save(skill: Skill): Promise<void> {
        try {

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
        } 
    }

    async findByTitle(title: string): Promise<Skill | undefined> {
        try {

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
            console.log("Error looking for skill: ", err);
        } 
    }
     
    async findAll(): Promise<Skill[] | undefined> {
        try {

            const response = await SkillModel.find();

            const skills = response.map((skill) => {
                return new Skill({ 
                    title: skill.title,
                    description: skill.description,
                    uuid: skill.uuid,
                    svg_image: skill.svg_image
                 })
            })

            return skills;

        } catch (err) {
            console.log("Error: ", err);

        } 
    }

    async update(_id: unknown, newData: Partial<Skill>): Promise<void> {
        try {

            await SkillModel.findByIdAndUpdate(_id, { $set: newData});

        } catch (err) {
            console.log("Error while updating skill", err);
        } 
    }

    async getIdbyUuid(uuid: string): Promise<unknown> {
        try {

            const project = await SkillModel.findOne({ uuid }, { _id: 1 })
            
            if (!project){
                throw new Error(`Skill with uuid ${uuid} not found.`);
            }

            return project._id;

        } catch (err) {
            console.log("Error trying to find skill by uuid.", err);
        } 
    }

    async delete(_id: unknown): Promise<void> {
        return
    }

}
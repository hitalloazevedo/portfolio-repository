import { uuid } from "uuidv4";

export class Project {
    public readonly id: string;

    public title: string;
    public description: string;
    public imageUrl: string;
    public repoUrl: string;
    public deployUrl: string;
    public technologies: Array<string> = [];

    constructor (props: Omit<Project, 'id'>, id?: string){
        Object.assign(this, props);

        if (!id){
            this.id = uuid();
        }
    }
}
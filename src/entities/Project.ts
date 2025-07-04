import { ObjectId } from "mongoose";
import { uuid } from "uuidv4";

export class Project {
    
    public readonly _id?: ObjectId;
    public readonly uuid?: string;
    public title: string;
    public description: string;
    public image_url: string;
    public repo_url: string;
    public deploy_url: string;
    public tech_stack: Array<string>;

    constructor (props: Project){
        
        // Object.assign(this, props);

        if (!props.uuid) {
            this.uuid = uuid();
        }

        this.uuid = props.uuid;
        this.title = props.title;
        this.description = props.description;
        this.image_url = props.image_url;
        this.repo_url = props.repo_url;
        this.deploy_url = props.deploy_url;
        this.tech_stack = props.tech_stack;
    }
}
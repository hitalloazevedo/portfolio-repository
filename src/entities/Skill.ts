import { uuid } from "uuidv4";

export class Skill {
    public readonly uuid?: string;
    public title: string;
    public description: string;
    public svg_image: string;

    constructor (props: Skill) {

        this.uuid = props.uuid;

        if (!props.uuid) {
            this.uuid = uuid();
        }
        
        this.title = props.title;
        this.description = props.description;
        this.svg_image = props.svg_image
    }
}

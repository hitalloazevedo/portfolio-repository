import { uuid } from "uuidv4";
import bcrypt from 'bcrypt' 


// const user = await User.create("", "")
export class User {

    public readonly uuid?: string;
    public email: string;
    public password: string

    constructor (email: string, password: string, _uuid?: string) {
        
        this.uuid = _uuid;

        if (!_uuid) {
            this.uuid = uuid();
        }

        this.email = email;
        this.password = password;

    }

    private static async encryptPassword(plainPassword: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainPassword, salt);
    }

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
    }

    // factory function
    static async create(email: string, password: string): Promise<User> {
        const hashedPassword = await this.encryptPassword(password);
        const _uuid = uuid();
        return new User(email, hashedPassword, _uuid);
    }
}

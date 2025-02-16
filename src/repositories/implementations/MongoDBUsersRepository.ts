import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new mongoose.Schema({
    uuid: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
});

const UserModel = mongoose.model<User>('User', UserSchema);

export class MongoDBUsersRepository implements IUsersRepository {
    async save(user: User): Promise<void> {
        try {

            const newUser = new UserModel({
                uuid: user.uuid,
                email: user.email,
                password: user.password
            })

            await newUser.save();

            console.log("User saved");

        } catch(err) {
            console.log(err);
        }
    }

    async findByEmail(email: string): Promise<User | undefined> {
        try {

            const response = await UserModel.findOne({ email: email });

            if (response){
                const user = new User(response.email, response.password, response.uuid);
                return user;
            }

        } catch (err) {
            console.log("Error looking for project: ", err);
        }
    }
}
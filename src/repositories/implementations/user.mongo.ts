import { reconstituteUser, User } from "../../entities/user";
import { UserRepository } from "../interfaces/user.repository";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new mongoose.Schema({
  uuid: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<User>("User", UserSchema);

export class MongoDBUsersRepository implements UserRepository {
  async save(user: User): Promise<void> {
      const newUser = new UserModel({
        uuid: user.uuid,
        email: user.email,
        password: user.password,
      });

      await newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    const response = await UserModel.findOne({ email: email });
    if (!response) return null;
    return reconstituteUser({
      uuid: response.uuid,
      email: response.email,
      hashedPassword: response.password,
    });
  }
}

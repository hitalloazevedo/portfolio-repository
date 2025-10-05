import { User } from "../entities/user";

export interface IUsersRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
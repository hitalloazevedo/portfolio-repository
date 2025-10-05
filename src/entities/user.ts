import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import z from "zod";
import { AuthorizationError } from "../use-cases/errors/authorization.error";

const userSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export interface UserInput {
  email: string;
  password: string;
};

export async function makeUser(props: UserInput): Promise<User> {
  const data = userSchema.parse(props);
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return new User({
    uuid: uuid(),
    email: data.email,
    hashedPassword: hashedPassword,
  });
}

export function reconstituteUser(props: {
  uuid: string;
  email: string;
  hashedPassword: string;
}): User {
  return new User({
    uuid: props.uuid,
    email: props.email,
    hashedPassword: props.hashedPassword,
  });
}


export class User {
  private _uuid: string;
  private _email: string;
  private _hashedPassword: string;

  constructor(props: UserProps) {
    this._uuid = props.uuid;
    this._email = props.email;
    this._hashedPassword = props.hashedPassword;
  }

  get uuid() {
    return this._uuid;
  }

  get email() {
    return this._email;
  }

  get hashedPassword() {
    return this._hashedPassword;
  }

  async comparePassword(password: string): Promise<void> {
    if (!bcrypt.compare(password, this.hashedPassword)) throw new AuthorizationError("error while matching user credentials.");
  }
}

interface UserProps {
  uuid: string;
  email: string;
  hashedPassword: string;
}
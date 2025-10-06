import { makeUser } from "./user"; // ajuste o caminho conforme seu projeto
import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";

jest.mock("bcrypt");
jest.mock("uuidv4");

describe("makeUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um usuário válido com uuid e senha criptografada", async () => {
    const fakeUUID = "123e4567-e89b-12d3-a456-426614174000";
    const fakeHash = "hashed_password";

    (uuidv7 as jest.Mock).mockReturnValue(fakeUUID);
    (bcrypt.hash as jest.Mock).mockResolvedValue(fakeHash);

    const user = await makeUser({
      email: "test@example.com",
      password: "123456",
    });

    expect(uuidv7).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);

    expect(user).toEqual(
      expect.objectContaining({
        uuid: fakeUUID,
        hashedPassword: fakeHash,
        email: "test@example.com",
      })
    );
  });

  it("deve falhar ao criar usuário com email inválido", async () => {
    await expect(
      makeUser({
        email: "not-an-email",
        password: "123456",
      })
    ).rejects.toThrow("Invalid email");
  });

  it("deve falhar ao criar usuário com senha curta", async () => {
    await expect(
      makeUser({
        email: "test@example.com",
        password: "123",
      })
    ).rejects.toThrow("Password must be at least 6 characters");
  });

  it("comparePassword deve retornar true quando a senha for igual", async () => {
    const plainPassword = "123456";
    const hashedPassword = "hash";

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (uuidv7 as jest.Mock).mockReturnValue("uuid");
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const user = await makeUser({
      email: "test@example.com",
      password: plainPassword,
    });

    const result = await user.comparePassword(plainPassword);

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("comparePassword deve retornar false quando a senha for diferente", async () => {
    const plainPassword = "123456";
    const hashedPassword = "hash";

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (uuidv7 as jest.Mock).mockReturnValue("uuid");
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const user = await makeUser({
      email: "test@example.com",
      password: plainPassword,
    });

    const result = await user.comparePassword("outraSenha");

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});

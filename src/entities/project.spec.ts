import { makeProject, ProjectInput } from "./project";
// mock do uuid para resultado previsível
jest.mock("uuidv7", () => ({
  uuid: jest.fn(() => "mocked-uuid"),
}));

describe("makeProject", () => {
  const input: ProjectInput = {
    title: "Meu Projeto",
    description: "Descrição do projeto",
    imageUrl: "https://example.com/image.png",
    githubUrl: "https://github.com/user/repo",
    deployUrl: "https://meuapp.com",
    techStack: ["Node.js", "Express"],
  };

  it("deve criar um projeto com uuid e props corretos", () => {
    const project = makeProject(input);

    expect(project).toEqual({
      uuid: "mocked-uuid",
      ...input,
    });
  });
});
// import { Request, Response } from "express";
// import { CreateProjectUseCase } from "./CreateProjectUseCase";

// export class CreateProjectController {

//     constructor (
//         private createProjectUseCase: CreateProjectUseCase
//     ) {}

//     async handle (request: Request, response: Response) {
//         const {
//             title,
//             description,
//             image_url,
//             repo_url,
//             deploy_url,
//             tech_stack
//         } = request.body;

//         try {
//             await this.createProjectUseCase.execute({
//                 title,
//                 description,
//                 image_url,
//                 repo_url,
//                 deploy_url,
//                 tech_stack
//             })
    
//             return response.status(201).send();
//         } catch (err) {
//             if (err instanceof Error){
//                 return response.status(400).json({
//                     message: err.message || 'Unexpected error.'
//                 });
//             }
//         }

//     }
// }
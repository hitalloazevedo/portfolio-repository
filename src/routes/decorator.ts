// decorators.ts
import "reflect-metadata";
import { RequestHandler } from "express";

export const ROUTES_KEY = Symbol("routes");

export type HttpMethod = "get" | "post" | "put" | "delete";

export interface RouteDefinition {
  path: string;
  requestMethod: HttpMethod;
  methodName: string;
  middlewares?: RequestHandler[];
}

export function Route(method: HttpMethod, path: string, ...middlewares: RequestHandler[]) {
  return (target: any, propertyKey: string) => {
    const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
    routes.push({
      path,
      requestMethod: method,
      methodName: propertyKey,
      middlewares,
    });
    Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
  };
}

export const Get = (path: string, ...middlewares: RequestHandler[]) => Route("get", path, ...middlewares);
export const Post = (path: string, ...middlewares: RequestHandler[]) => Route("post", path, ...middlewares);
export const Put = (path: string, ...middlewares: RequestHandler[]) => Route("put", path, ...middlewares);
export const Delete = (path: string, ...middlewares: RequestHandler[]) => Route("delete", path, ...middlewares);

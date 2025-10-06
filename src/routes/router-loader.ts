// router-loader.ts
import { Router } from "express";
import "reflect-metadata";
import { RouteDefinition, ROUTES_KEY } from "./decorator";

type ControllerFactory = () => any;

export function loadControllers(controllers: (ControllerFactory | any)[]): Router {
  const router = Router();

  controllers.forEach((ControllerOrFactory) => {
    const instance = typeof ControllerOrFactory === "function" 
      ? ControllerOrFactory() 
      : new ControllerOrFactory();

    const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES_KEY, instance.constructor) || [];

    routes.forEach((route) => {
      const handler = (instance as any)[route.methodName].bind(instance);
      if (route.middlewares && route.middlewares.length > 0) {
        router[route.requestMethod](route.path, ...route.middlewares, handler);
      } else {
        router[route.requestMethod](route.path, handler);
      }
    });
  });

  return router;
}

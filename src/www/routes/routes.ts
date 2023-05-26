import { Application } from "express";
import { executionController } from "../controllers/exec-controller";

export function routesProvider(app: Application) {
  app.post("/exec", executionController().exec);
}

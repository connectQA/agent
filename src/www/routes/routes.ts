import { Application } from "express";
import { executionController } from "../controllers/exec/exec-controller";
import { authController } from "../controllers/auth/auth-controller";

export function routesProvider(app: Application) {
  app.get("/get", authController().get);
  app.post("/", executionController().exec);
}

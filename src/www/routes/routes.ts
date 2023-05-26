import { Application } from "express";
import { goController } from "../controllers/go-controller";

export function routesProvider(app: Application) {
  app.post("/go", goController().go);
}

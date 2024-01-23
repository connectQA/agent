import { Application } from "express";
import { goController } from "../controllers/go-controller.js";
import { hostController } from "../controllers/host-controller.js";

export function routesProvider(app: Application) {
  app.post("/go", goController().go);
  app.post("/details", hostController().details);
}

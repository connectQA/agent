import { Application } from "express";
import { goController } from "../controllers/go-controller.js";
import { ConnectQAWorker } from "../../worker/worker.js";

const handler = new ConnectQAWorker().fileHandler();

export function routesProvider(app: Application) {
  app.post("/go", handler.single("test-file"), goController().go);
}

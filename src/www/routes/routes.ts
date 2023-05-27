import { Application } from "express";
import { goController } from "../controllers/go-controller";
import { ConnectQAWorker } from "../../worker/worker";

const handler = new ConnectQAWorker().fileHandler();

export function routesProvider(app: Application) {
  app.post("/go", handler.single("test-file"), goController().go);
}

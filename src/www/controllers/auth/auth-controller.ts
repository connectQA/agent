import { Request, Response } from "express";

export function authController() {
  return {
    get(req: Request, res: Response) {
      console.log(req.body);
      res.json({
        hello: "world",
      });
    },
  };
}

import { Tunnel } from "./src/utils/tunnel-ssh";
import express from "express";

const app = express();
app.use(express.json());

app.get("/get", (req, res) => {
  console.log(req.body);
  res.json({
    hello: "world",
  });
});

app.post("/", (req, res) => {
  console.log(req.body.java);
  res.json({
    hello: "world",
  });
});

const test = new Tunnel(3000);

const exec = async () => {
  const tunnel = await test.createTunnel();
  console.log(tunnel.url);
};

exec();
app.listen(3000);

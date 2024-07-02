import express from "express";
//import helmet from "helmet";
//import cors from "corse";

import mixtral8x7bRouter from "./bedrock/mixtral8x7b-router.js";
import mistral7bRouter from "./bedrock/mistral7b-router.js";
import openairouter from "./openai/openai-router.js";

const server = express();

server.use(express.json());
server.use("/bedrock/mixtral8x7b", mixtral8x7bRouter);
server.use("/bedrock/mistral7b", mistral7bRouter);``
server.use("/openai", openairouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

export default server;




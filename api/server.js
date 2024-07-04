import express from "express";
//import helmet from "helmet";
//import cors from "corse";

// import claudeRouter from "./bedrock-claude-router.js";
// import mistralRouter from "./bedrock-mistral-router.js";

import openaiRouter from "./openai-router.js";
import bedrockRouter from "./bedrock-router.js";
import { BedrockModels, OpenAIModels } from "../model-invokers/model-configs.js";
// TODO: add express routers for all models

const server = express();

server.use(express.json());
server.use("/bedrock", bedrockRouter);
server.use("/openai", openaiRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.get("/list", (req, res) => {
  const openAiKeys = Object.keys(OpenAIModels);
  const bedrockKeys = Object.keys(BedrockModels);

  const result = {
    openai: openAiKeys,
    bedrock: bedrockKeys,
  };
  
  res.json(result);

});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

export default server;

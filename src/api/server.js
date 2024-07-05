import express from "express";
//import helmet from "helmet";
//import cors from "corse";

// import openaiRouter from "./openai-router.js";
// import bedrockRouter from "./bedrock-router.js";
// import { BedrockModels, OpenAIModels } from "../model-invokers/model-configs.js";
import { AllModels, getInvoker } from "../model-invokers/model-configs.js";

const server = express();

server.use(express.json());
// server.use("/bedrock", bedrockRouter);
// server.use("/openai", openaiRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.get("/list", (req, res) => {
  
  res.json(AllModels);

});

server.post("/:modelType/:modelName", async (req, res) => {
  const { modelType, modelName } = req.params;

  const invoker = await getInvoker(modelType, modelName);

  const messages = req.body.messages;
  invoker(messages).then((response) => {
    res.send(response);
  });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

export default server;

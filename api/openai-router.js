import  express from "express";
const router = express.Router();
import { OpenAIModels } from "../model-invokers/model-configs.js";

// TODO: duplicate gpt4o router to create routers for all models

router.get("/", (req, res, next) => {
    res.send("Hello from openai router!");
});

router.post("/:openAiModel", async (req, res, next) => {
    const openAiModel = req.params.openAiModel;
    const modelConfig = OpenAIModels[openAiModel];

    if (!modelConfig) {
        res.status(404).send("Model not found");
        return;
    }

    const modelId = modelConfig.modelId;
    const module = await modelConfig.module();
    const invoker = modelConfig.invoker(module);

    const messages = req.body.messages;
    invoker(messages, modelId).then((response) => {
        res.send(response);
    });
});

// router.post("/gpt4o", async (req, res, next) => {
//     // we are using lazy loading/evaluation so we don't load every model at startup
//     const modelConfig = OpenAIModels.GPT_4O;

//     const modelId = modelConfig.modelId;
//     const module = await modelConfig.module();
//     const invoker = modelConfig.invoker(module);

//     const messages = req.body.messages;
//     invoker(messages, modelId).then((response) => {
//         res.send(response);
//     });
// });

// router.post("/gpt4", async (req, res, next) => {
//     // we are using lazy loading/evaluation so we don't load every model at startup
//     const modelConfig = OpenAIModels.GPT_4;

//     const modelId = modelConfig.modelId;
//     const module = await modelConfig.module();
//     const invoker = modelConfig.invoker(module);

//     const messages = req.body.messages;
//     invoker(messages, modelId).then((response) => {
//         res.send(response);
//     });
// });

// router.post("/gpt35", async (req, res, next) => {
//     // we are using lazy loading/evaluation so we don't load every model at startup
//     const modelConfig = OpenAIModels.GPT_3_5_2023_05_13;

//     const modelId = modelConfig.modelId;
//     const module = await modelConfig.module();
//     const invoker = modelConfig.invoker(module);

//     const messages = req.body.messages;
//     invoker(messages, modelId).then((response) => {
//         res.send(response);
//     });
// });

// router.post("/gpt3", async (req, res, next) => {
//     // we are using lazy loading/evaluation so we don't load every model at startup
//     const modelConfig = OpenAIModels.GPT_3_2023_05_13;

//     const modelId = modelConfig.modelId;
//     const module = await modelConfig.module();
//     const invoker = modelConfig.invoker(module);

//     const messages = req.body.messages;
//     invoker(messages, modelId).then((response) => {
//         res.send(response);
//     });
// });

export default router;
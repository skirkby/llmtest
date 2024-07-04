import express from "express";
const router = express.Router();
import { BedrockModels } from "../model-invokers/model-configs.js";



router.get("/", (req, res, next) => {
    res.send("bedrock claude router!");
});

router.post("/:bedrockModel", async (req, res, next) => {
    // we are using lazy loading/evaluation so we don't load every model at startup
    const bedrockModel = req.params.bedrockModel;
    const modelConfig = BedrockModels[bedrockModel];

    const modelId = modelConfig.modelId;
    const module = await modelConfig.module();
    const invoker = modelConfig.invoker(module);

    const messages = req.body.messages;
    invoker(messages, modelId).then((response) => {
        res.send(response);
    });
});




export default router;
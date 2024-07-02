import express from "express";
const router = express.Router();
import mixtralInvoker from "../models/mistral_ai/mixtral_8x7b.js";


router.get("/", (req, res, next) => {
    res.send("bedrock mixtral_8x7b router");
});

router.post("/instruct", async (req, res, next) => {
    const messages = req.body.messages;
    mixtralInvoker(messages).then((response) => {
        res.send(response);
    });
});

export default router;
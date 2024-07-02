import express from "express";
const router = express.Router();
import mistralInvoker from "../models/mistral_ai/mistral_7b.js";


router.get("/", (req, res, next) => {
    res.send("bedrock mistral_7b router!");
});

router.post("/instruct", async (req, res, next) => {
    const messages = req.body.messages;
    mistralInvoker(messages).then((response) => {
        res.send(response);
    });
});

export default router;
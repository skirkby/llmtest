import  express from "express";
const router = express.Router();
import openaiInvoker from "../models/gpt_4o/gpt_4o.js";


router.get("/", (req, res, next) => {
    res.send("Hello from openai router!");
});

router.post("/gpt-4o", async (req, res, next) => {
    // extract messages and types from json
    // map onto a json object (maybe don't need to)
    // pass in with model id
    const messages = req.body.messages;
    openaiInvoker(messages).then((response) => {
        res.send(response);
    });
});

export default router;
import OpenAI from "openai";

const createOpenAIClient = () => {
    return new OpenAI();
}

export default createOpenAIClient;

import { OpenAIModels } from "./model-configs.js";
import createOpenAIClient from "./openai-runtime-client-factory.js";

////////////////////////////////////////////////////////////////////////////////////////
export const invokeModel = async (
    messages,
    modelId = OpenAIModels.GPT_4O.modelId,
) => {
    // Create a new OpenAI client instance.
    const openaiClient = createOpenAIClient();

    // Prepare the payload for the model.
    const payload = {
        messages: messages.map(message => ({
        role: message.role || "system",
        content: message.content
        })),
        model: modelId
    };

    // Invoke gpt-4o with the payload and wait for the response.
    const completion = await openaiClient.chat.completions.create(payload);

    // Decode and return the response(s)
    const responses = completion.choices.map(choice => choice.message.content);
    return responses;
};




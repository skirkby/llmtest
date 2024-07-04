
import { BedrockModels } from "./model-identifiers.js";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import createBedrockClient from "./bedrock-runtime-client-factory.js";

////////////////////////////////////////////////////////////////////////////////////////
export const invokeModel = async (
    messages,
    // default to Mixtral 8x7b model
    modelId = BedrockModels.MIXTRAL_8X7B.modelId
) => {

    //////////////////////////////////////////////////////////////////////////
    // Create a new Bedrock Runtime client instance.
    // the default bedrock client uses us-west-2 region, and the access key and secret key 
    // are set in the environment variables (you can alsos set them in .env)
    // you can also pass the region and credentials in an object as a parameter to the function
    const client = createBedrockClient();
  

    // Combine messages into a single string with tags for Mixtral.
    const formattedMessages = messages.map(message => {
        return `<${message.role}>${message.content}</${message.role}>`;
    }).join(' ');


    // Mistral instruct models provide optimal results when embedding
    // the prompt into the following template:
    const instruction = `<s>[INST] ${formattedMessages} [/INST]`;

    // Prepare the payload.
    const payload = {
        prompt: instruction,
        max_tokens: 500,
        temperature: 0.5,
    };


    // Invoke the model with the payload and wait for the response.
    const command = new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify(payload),
        modelId,
    });
    const apiResponse = await client.send(command);


    // Decode and return the response.
    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    const responseBody = JSON.parse(decodedResponseBody);

    return responseBody.outputs[0].text;
};


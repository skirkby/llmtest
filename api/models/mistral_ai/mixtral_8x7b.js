
import {FoundationModels} from "../foundation_models.js";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

////////////////////////////////////////////////////////////////////////////////////////
const invokeModel = async (
    messages,
    modelId = FoundationModels.MIXTRAL_8X7B.modelId
) => {

    //////////////////////////////////////////////////////////////////////////
    // Create a new Bedrock Runtime client instance.
    var runtimeClientParms = {
        region: "us-west-2",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
        }
    }
    const client = new BedrockRuntimeClient(runtimeClientParms);
  

    //////////////////////////////////////////////////////////////////////////
    // Combine messages into a single string with tags for Mixtral.
    const formattedMessages = messages.map(message => {
        return `<${message.role}>${message.content}</${message.role}>`;
    }).join(' ');


    //////////////////////////////////////////////////////////////////////////
    // Mistral instruct models provide optimal results when embedding
    // the prompt into the following template:
    const instruction = `<s>[INST] ${formattedMessages} [/INST]`;

    // Prepare the payload.
    const payload = {
        prompt: instruction,
        max_tokens: 500,
        temperature: 0.5,
    };


    //////////////////////////////////////////////////////////////////////////
    // Invoke the model with the payload and wait for the response.
    const command = new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify(payload),
        modelId,
    });
    const apiResponse = await client.send(command);


    // Decode and return the response.
    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    /** @type {ResponseBody} */
    const responseBody = JSON.parse(decodedResponseBody);

    return responseBody.outputs[0].text;
};

export default invokeModel;

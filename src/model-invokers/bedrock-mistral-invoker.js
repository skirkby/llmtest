

import { AllModels } from "./model-configs.js";
import {
  InvokeModelCommand,
  InvokeModelWithResponseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import createBedrockClient from "../client-factories/bedrock-runtime-client-factory.js";



///////////////////////////////////////////
// Invokes Mistral models.
//
//
//
export const invokeModel = async (

  messages,
  // default to Mixtral 8x7b model
  modelId = AllModels.bedrock.MIXTRAL_8X7B.modelId,
) => {
  // Create a new Bedrock Runtime client instance.
  // the default bedrock client uses the region, access key and secret key 
  // set in environment variables (you can alsos set them in .env)
  // you can also pass the region and credentials in an object as a parameter to the function
  const client = createBedrockClient();

  // parse the system prompt and user/assistant messages
  let formattedMessages = parseMessages(messages);

  // Prepare the payload for the model.
  const payload = {
    max_tokens: 500,
    prompt: formattedMessages,
    temperature: 0.5
  };

  // Invoke Claude with the payload and wait for the response.
  const command = new InvokeModelCommand({
    contentType: "application/json",
    body: JSON.stringify(payload),
    modelId,
  });
  const apiResponse = await client.send(command);

  // Decode and return the response(s)
  const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
  const responseBody = JSON.parse(decodedResponseBody);
  return responseBody.outputs[0].text;
};


///////////////////////////////////////////
// create the turn-based conversation format for the model
//
export const parseMessages = (messages) => {
  const formattedMessages = messages.map(message => {
    return `<${message.role}>${message.content}</${message.role}>`;
  }).join(' ');

  return formattedMessages
}




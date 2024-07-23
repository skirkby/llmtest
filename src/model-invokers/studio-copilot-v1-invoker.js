// TODO: refactor claud3-haiku-invoker.js to use shared id's
// TODO: duplicate claude3 haiku invoker for other claude3 models

import { AllModels } from "./model-configs.js";
import {
  InvokeModelCommand,
  InvokeModelWithResponseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import createBedrockClient from "../client-factories/bedrock-runtime-client-factory.js";
import scriptStruct from '../script-struct.json' with { type: "json" };


///////////////////////////////////////////
// Invokes Anthropic Claude 3 using the Messages API.
//
// To learn more about the Anthropic Messages API, go to:
// 
// https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages.html
// or
// https://docs.anthropic.com/en/api/messages
//
//
export const invokeModel = async (

  messages,
  // default to Claude 3 Haiku model
  modelId = AllModels.bedrock.CLAUDE_3_HAIKU.modelId,
) => {

  // TODO: refactor to support multiple "content blocks" of different types, as allowed
  // by the API for Claude3.  Also, sanity check for content block types not supported
  // by Claude2.
    
  // Create a new Bedrock Runtime client instance.
  // the default bedrock client uses us-west-2 region, and the access key and secret key 
  // are set in environment variables (you can alsos set them in .env)
  // you can also pass the region and credentials in an object as a parameter to the function
  const client = createBedrockClient();

  // parse the system prompt and user/assistant messages
  let parsedMessages = parseMessages(messages);

  // Prepare the payload for the model.
  const payload = {
    // note that the anthropic_version is the anthropic API version
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    system: parsedMessages.systemPrompt,
    messages: parsedMessages.messages
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
  const responseBody = scriptStruct;
  //const responseBody = JSON.parse(decodedResponseBody);
  return responseBody;
};

///////////////////////////////////////////
// Invokes Anthropic Claude 3 and processes the response stream.
//
// To learn more about the Anthropic Messages API, go to:
// 
// https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages.html
// or
// https://docs.anthropic.com/en/api/messages
//
//
export const invokeModelWithResponseStream = async (
  messages,
  modelId = AllModels.bedrock.CLAUDE_3_HAIKU.modelId,
) => {
  // Create a new Bedrock Runtime client instance.
  const client = createBedrockClient();

  let parsedMessages = parseMessages(messages);


  // Prepare the payload for the model.
  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    system: parsedMessages.systemPrompt,
    messages: parsedMessages.messages
  };

  // Invoke Claude with the payload and wait for the API to respond.
  const command = new InvokeModelWithResponseStreamCommand({
    contentType: "application/json",
    body: JSON.stringify(payload),
    modelId,
  });
  const apiResponse = await client.send(command);

  let completeMessage = "";

  // Decode and process the response stream
  for await (const item of apiResponse.body) {
    /** @type Chunk */
    const chunk = JSON.parse(new TextDecoder().decode(item.chunk.bytes));
    const chunk_type = chunk.type;

    if (chunk_type === "content_block_delta") {
      const text = chunk.delta.text;
      completeMessage = completeMessage + text;
      // TODO: refactor to return chunks to the caller as they arrive (callback?)
      process.stdout.write(text);
    }
  }

  // Return the final response
  return completeMessage;
};

///////////////////////////////////////////
// Parse the messages array and extract the system prompt.
//
// The messages array contains objects with "role" and "content" properties.
// The "role" property can be "user" or "assistant". The "content" property can
// be text, image, or other types. The function processes "system" objects and
// returns the remaining messages and the concatenated system prompt.
// TODO: refactor to support multiple "content blocks" of different types, as allowed
export const parseMessages = (messages) => {
  let systemPrompt = "";

  // Iterate through the messages array and process "system" objects
  messages = messages.filter(message => {
    if (message.role === "system") {
      // Append the content of "system" objects to the systemContent string
      systemPrompt += message.content + " "; // Add a space for separation
      return false; // Exclude this "system" object from the resulting array
    }
    return true; // Include non-"system" objects in the resulting array
  });

  return {messages:messages, systemPrompt:systemPrompt};
}




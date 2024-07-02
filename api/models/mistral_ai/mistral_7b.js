// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { fileURLToPath } from "url";

import { FoundationModels } from "../foundation_models.js";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import createBedrockClient from "../bedrock-runtime-client-factory.js";

/**
 * @typedef {Object} Output
 * @property {string} text
 *
 * @typedef {Object} ResponseBody
 * @property {Output[]} outputs
 */

/**
 * Invokes a Mistral 7B Instruct model.
 *
 * @param {string} prompt - The input text prompt for the model to complete.
 * @param {string} [modelId] - The ID of the model to use. Defaults to "mistral.mistral-7b-instruct-v0:2".
 */
const invokeModel = async (
    prompt,
    modelId = FoundationModels.MISTRAL_7B.modelId,
) => {


    //////////////////////////////////////////////////////////////////////////
    // create client using default parameters (see factory function for defaults)
    const client = createBedrockClient();

    // Mistral instruct models provide optimal results when embedding
    // the prompt into the following template:
    const instruction = `<s>[INST] ${prompt} [/INST]`;

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
    /** @type {ResponseBody} */
    const responseBody = JSON.parse(decodedResponseBody);
    return responseBody.outputs[0].text;
};


////////////////////////////////////////////////////////////////////////////////////////
// Invoke the function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const prompt =
        'Complete the following in one sentence: "Once upon a time..."';
    const modelId = FoundationModels.MISTRAL_7B.modelId;
    console.log(`Prompt: ${prompt}`);
    console.log(`Model ID: ${modelId}`);

    try {
        console.log("-".repeat(53));
        const response = await invokeModel(prompt, modelId);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

export default invokeModel;
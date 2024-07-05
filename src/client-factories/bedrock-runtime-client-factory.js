// bedrockClient.js

import {
    BedrockRuntimeClient,
} from "@aws-sdk/client-bedrock-runtime";


const createBedrockClient = (runtimeClientParams = {
        region: process.env.AWS_DEFAULT_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
        }}
) => {

    return new BedrockRuntimeClient(runtimeClientParams);
}

export default createBedrockClient;

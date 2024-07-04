 // TODO: modify module properties of each model to point to the correct module file
 const BedrockModels = Object.freeze({
    CLAUDE_35_SONNET: {
      modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
      modelName: "Anthropic Claude 3.5 Sonnet",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    CLAUDE_3_HAIKU: {
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      modelName: "Anthropic Claude 3 Haiku",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    CLAUDE_3_SONNET: {
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      modelName: "Anthropic Claude 3 Sonnet",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    CLAUDE_2_1: {
      modelId: "anthropic.claude-v2:1",
      modelName: "Anthropic Claude 2.1",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    CLAUDE_2: {
      modelId: "anthropic.claude-v2",
      modelName: "Anthropic Claude 2.0",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    CLAUDE_INSTANT: {
      modelId: "anthropic.claude-instant-v1",
      modelName: "Anthropic Claude Instant",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    MISTRAL_7B: {
      modelId: "mistral.mistral-7b-instruct-v0:2",
      modelName: "Mistral 7B Instruct",
      module: () => import("./bedrock-mistral-invoker.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    MIXTRAL_8X7B: {
      modelId: "mistral.mixtral-8x7b-instruct-v0:1",
      modelName: "Mixtral 8X7B Instruct",
      module: () => import("./bedrock-mistral-invoker.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
  });


const OpenAIModels = Object.freeze({
    GPT_4O: {
      modelId: "gpt-4o",
      modelName: "OpenAI GPT-4o",
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    GPT_4: {
      modelId: "gpt-4",
      modelName: "OpenAI GPT-4",      
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    GPT_35_TURBO: {
      modelId: "gpt-3.5-turbo",
      modelName: "OpenAI GPT-3.5 Turbo",
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    GPT_35_TURBO_INSTRUCT: {
      modelId: "gpt-3.5-turbo-instruct",
      modelName: "OpenAI GPT-3.5 Turbo Instruct",
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    GPT_35_TURBO_16k: {
      modelId: "gpt-3.5-turbo-16k",
      modelName: "OpenAI GPT-3.5 Turbo 16k",
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    }
  });

  // TODO: add support for these models.  Currently not supported in this app (July 2024)
const BedrockAlternativeModels = Object.freeze({
  JURASSIC2_MID: {
    modelId: "ai21.j2-mid-v1",
    modelName: "Jurassic-2 Mid",
    module: () => import("./unsupported-invokers/ai21-labs-jurassic2-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  JURASSIC2_ULTRA: {
    modelId: "ai21.j2-ultra-v1",
    modelName: "Jurassic-2 Ultra",
    module: () => import("./unsupported-invokers/ai21-labs-jurassic2-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  TITAN_TEXT_G1_EXPRESS: {
    modelId: "amazon.titan-text-express-v1",
    modelName: "Titan Text G1 - Express",
    module: () => import("./unsupported-invokers/amazon-titan-text-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  TITAN_TEXT_G1_LITE: {
    modelId: "amazon.titan-text-lite-v1",
    modelName: "Titan Text G1 - Lite",
    module: () => import("./unsupported-invokers/amazon-titan-text-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  LLAMA_2_13b: {
    modelId: "meta.llama2-13b-chat-v1",
    modelName: "Llama 2",
    module: () => import("./unsupported-invokers/meta-llama2-quickstart-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  LLAMA_3_8b_INSTRUCT: {
    modelId: "meta.llama3-8b-instruct-v1:0",
    modelName: "Llama 3",
    module: () => import("./unsupported-invokers/meta-llama3-quickstart-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
});

  export {BedrockModels, OpenAIModels};

const AllModels = Object.freeze({
  "bedrock": {
    "claude-35-sonnet": {
      modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
      modelName: "Anthropic Claude 3.5 Sonnet",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "claude-3-haiku": {
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      modelName: "Anthropic Claude 3 Haiku",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "claude-3-sonnet": {
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      modelName: "Anthropic Claude 3 Sonnet",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "culade-2-1": {
      modelId: "anthropic.claude-v2:1",
      modelName: "Anthropic Claude 2.1",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "claude-2": {
      modelId: "anthropic.claude-v2",
      modelName: "Anthropic Claude 2.0",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "claude-instant": {
      modelId: "anthropic.claude-instant-v1",
      modelName: "Anthropic Claude Instant",
      module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "mistral-7-b": {
      modelId: "mistral.mistral-7b-instruct-v0:2",
      modelName: "Mistral 7B Instruct",
      module: () => import("./bedrock-mistral-invoker.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    "mixtral-8x7B": {
      modelId: "mistral.mixtral-8x7b-instruct-v0:1",
      modelName: "Mixtral 8X7B Instruct",
      module: () => import("./bedrock-mistral-invoker.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    "studio-copilot": {
      modelId: "anthropic.claude-v2",
      modelName: "Anthropic Claude 2.0",
      module: () => import("./studio-copilot-v1-invoker.js"),
      //module: () => import("./bedrock-anthropic-invoker.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
  },
  "openai": {
    "gpt-4o": {
      modelId: "gpt-4o",
      modelName: "OpenAI GPT-4o",
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "gpt-4": {
      modelId: "gpt-4",
      modelName: "OpenAI GPT-4",      
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "gpt-35-turbo": {
      modelId: "gpt-3.5-turbo",
      modelName: "OpenAI GPT-3.5 Turbo",
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "gpt-35-turbo-instruct": {
      modelId: "gpt-3.5-turbo-instruct",
      modelName: "OpenAI GPT-3.5 Turbo Instruct",
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    },
    "gpt-35-turbo-16k": {
      modelId: "gpt-3.5-turbo-16k",
      modelName: "OpenAI GPT-3.5 Turbo 16k",
      module: () => import("./openai-invoker.js"),
      invoker: (module) => module.invokeModel,
    }
  }
});

  // TODO: add support for these models.  Currently not supported in this app (July 2024)
const BedrockAlternativeModels = Object.freeze({
  "jurassic2-mid": {
    modelId: "ai21.j2-mid-v1",
    modelName: "Jurassic-2 Mid",
    module: () => import("./unsupported-invokers/ai21-labs-jurassic2-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  "jurassic2-ultra": {
    modelId: "ai21.j2-ultra-v1",
    modelName: "Jurassic-2 Ultra",
    module: () => import("./unsupported-invokers/ai21-labs-jurassic2-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  "titan-text-g1-express": {
    modelId: "amazon.titan-text-express-v1",
    modelName: "Titan Text G1 - Express",
    module: () => import("./unsupported-invokers/amazon-titan-text-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  "titan-text-g1-lite": {
    modelId: "amazon.titan-text-lite-v1",
    modelName: "Titan Text G1 - Lite",
    module: () => import("./unsupported-invokers/amazon-titan-text-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  "llama-2-13b": {
    modelId: "meta.llama2-13b-chat-v1",
    modelName: "Llama 2",
    module: () => import("./unsupported-invokers/meta-llama2-quickstart-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
  "llama-3-8b-instruct": {
    modelId: "meta.llama3-8b-instruct-v1:0",
    modelName: "Llama 3",
    module: () => import("./unsupported-invokers/meta-llama3-quickstart-invoker.js"),
    invoker: (/** @type {Module} */ module) => module.invokeModel,
  },
});


///////////////////////////////////////////
// Get the invoker for a model
///////////////////////////////////////////
const getInvoker = async (modelType, modelName) => {
  const modelConfig = AllModels[modelType]?.[modelName];

  if (!modelConfig) {    
    return null;
  }

  const module = await modelConfig.module();
  const invoker = modelConfig.invoker(module);

  return async function(messages) {
    return await invoker(messages, modelConfig.modelId);
  }
}


  export {AllModels, getInvoker};
 const FoundationModels = Object.freeze({
    CLAUDE_3_HAIKU: {
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      modelName: "Anthropic Claude 3 Haiku",
      module: () => import("./anthropic_claude/claude_3.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    CLAUDE_3_SONNET: {
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      modelName: "Anthropic Claude 3 Sonnet",
      module: () => import("./anthropic_claude/claude_3.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    CLAUDE_2_1: {
      modelId: "anthropic.claude-v2:1",
      modelName: "Anthropic Claude 2.1",
      module: () => import("./anthropic_claude/claude_2.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    CLAUDE_2: {
      modelId: "anthropic.claude-v2",
      modelName: "Anthropic Claude 2.0",
      module: () => import("./anthropic_claude/claude_2.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    CLAUDE_INSTANT: {
      modelId: "anthropic.claude-instant-v1",
      modelName: "Anthropic Claude Instant",
      module: () => import("./anthropic_claude/claude_instant_1.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    JURASSIC2_MID: {
      modelId: "ai21.j2-mid-v1",
      modelName: "Jurassic-2 Mid",
      module: () => import("./ai21_labs_jurassic2/jurassic2.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    JURASSIC2_ULTRA: {
      modelId: "ai21.j2-ultra-v1",
      modelName: "Jurassic-2 Ultra",
      module: () => import("./ai21_labs_jurassic2/jurassic2.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    MISTRAL_7B: {
      modelId: "mistral.mistral-7b-instruct-v0:2",
      modelName: "Mistral 7B Instruct",
      module: () => import("./mistral_ai/mistral_7b.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    MIXTRAL_8X7B: {
      modelId: "mistral.mixtral-8x7b-instruct-v0:1",
      modelName: "Mixtral 8X7B Instruct",
      module: () => import("./mistral_ai/mixtral_8x7b.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    TITAN_TEXT_G1_EXPRESS: {
      modelId: "amazon.titan-text-express-v1",
      modelName: "Titan Text G1 - Express",
      module: () => import("./amazon_titan/titan_text.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    TITAN_TEXT_G1_LITE: {
      modelId: "amazon.titan-text-lite-v1",
      modelName: "Titan Text G1 - Lite",
      module: () => import("./amazon_titan/titan_text.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
  });

const OpenAIModels = Object.freeze({
    GPT_4O: {
      modelId: "gpt-4o-2024-05-13",
      modelName: "OpenAI GPT-4o",
      module: () => import("../models/openai/gpt.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    GPT_4: {
      modelId: "gpt-4-2024-05-13",
      modelName: "OpenAI GPT-4",
      module: () => import("../models/openai/gpt.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    GPT_3_5_2023_05_13: {
      modelId: "gpt-3.5-2023-05-13",
      modelName: "OpenAI GPT-3.5",
      module: () => import("../models/openai/gpt.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
    GPT_3_2023_05_13: {
      modelId: "gpt-3-2023-05-13",
      modelName: "OpenAI GPT-3",
      module: () => import("../models/openai/gpt.js"),
      invoker: (/** @type {Module} */ module) => module.invokeModel,
    },
  });

  export {FoundationModels, OpenAIModels};
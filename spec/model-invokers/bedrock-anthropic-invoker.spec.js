// import { mockClient } from "aws-sdk-client-mock";
// import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime"; 
import { invokeModel, parseMessages } from "../../src/model-invokers/bedrock-anthropic-invoker.js";


// const bedrockClientMock = mockClient(BedrockRuntimeClient);

// beforeEach(() => {
//   bedrockClientMock.reset();
// });

describe("anthropic parseMessages", () => {
  it("should parse messages correctly", () => {
    const messages = [
      {
        role: "user",
        content: "user instruction 1",
      },
      {
        role: "assistant",
        content: "assistant instruction 1",
      },
      {
        role: "user",
        content: "user instruction 2",
      },
      {
        role: "assistant",
        content: "assistant instruction 2",
      },
      {
        role: "system",
        content: "system prompt1",
      },
      {
        role: "system",
        content: "system prompt2",
      }
    ];
    const parsedMessages = parseMessages(messages);
    expect(parsedMessages).toEqual({
      systemPrompt: "system prompt1 system prompt2 ",
      messages: [
        {
          role: "user",
          content: "user instruction 1",
        },
        {
          role: "assistant",
          content: "assistant instruction 1",
        },
        {
          role: "user",
          content: "user instruction 2",
        },
        {
          role: "assistant",
          content: "assistant instruction 2",
        },
      ],
    });
  });
});

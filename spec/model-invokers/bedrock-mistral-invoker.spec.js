// import { mockClient } from "aws-sdk-client-mock";
// import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime"; 
import { invokeModel, parseMessages } from "../../src/model-invokers/bedrock-mistral-invoker.js";


// const bedrockClientMock = mockClient(BedrockRuntimeClient);

// beforeEach(() => {
//   bedrockClientMock.reset();
// });

describe("mistral parseMessages", () => {
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
    expect(parsedMessages).toEqual("<user>user instruction 1</user> <assistant>assistant instruction 1</assistant> <user>user instruction 2</user> <assistant>assistant instruction 2</assistant> <system>system prompt1</system> <system>system prompt2</system>");
  });
});

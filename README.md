tl;dr
=========
- create an access key and secret for an IAM user in AWS for bedrock, and save them to AWS_ACCESS_KEY_ID and AWS_ACCESS_SECRET_KEY environment variables in .env.
- create an api key for your OpenAI account, and save it to OPENAI_API_KEY environment variable in .env. (See https://platform.openai.com/api-keys)
- enable all the models for the us-east-1 region in Bedrock (see https://us-east-1.console.aws.amazon.com/bedrock, open the left panel, and choose "Model Access" at the bottom)
- set us-east-1 as your default AWS region for Bedrock models in the AWS_DEFAULT_REGION environment variable in .env.
- optionally change the default listen port for the app from 5000 with a PORT environment variable in .env (PORT=<yourPort>)
- run the app, and send a GET http://localhost:5000/list request to see the model names that are supported
- send a POST http://localhost:5000/openai/<modelName> or POST http://localhost:5000/bedrock/<modelName> request to test the model
- be sure to include a JSON body with one or more "message" in a "messages" array:

{
  "messages": [
    {
      "role":"user",
      "content": "hey there, wazzup?"
    }
  ]
}

- message roles can be "user", "assistant", or "system". User messages are past prompts you have sent in (plus the new one you are adding).  Assistant messages are responses the model has sent back in the past.  And System messages are instructions to the model about how to generate a response (i.e. "always respond in the voice of a pirate")
- content is typically just a string.  You will need to figure out how to format/encode it in the tool you are sending it from - Postman, API Dog, etc. - especially for multi-line "contents".
- The following models are current supported (July 2024):

{
    "openai": [
        "GPT_4O",
        "GPT_4",
        "GPT_35_TURBO",
        "GPT_35_TURBO_INSTRUCT",
        "GPT_35_TURBO_16k"
    ],
    "bedrock": [
        "CLAUDE_35_SONNET",
        "CLAUDE_3_HAIKU",
        "CLAUDE_3_SONNET",
        "CLAUDE_2_1",
        "CLAUDE_2",
        "CLAUDE_INSTANT",
        "MISTRAL_7B",
        "MIXTRAL_8X7B"
    ]
}

- so requests can go to http://localhost:5000/openai/GPT_4O, or http://localhost:5000/bedrock/CLAUDE_35_SONNET, etc.  Case matters.

details
=========

This is a node.js / express app with a simple API that allows you to submit requests to various OpenAI or Amazon Bedrock-hosted models.

The design lazy-loads the needed modules when an API request for a specific model is received.  There are routers for openai and bedrock.  These routers define Express handlers that parameterize the model name from the URL, and retrieve a config object based on the model name.  The config object contains 3 important properties: the model ID (typically a string that identifies to the service the model to be used), a defined function that returns the correct "invoker" module for the model (different models and services have different prompt formatting needs, etc., so they each have their own "invoker" model), and a defined function that returns the correct "invokeModel" function from the invoker module.  This design allows us to lazy-load the modules.

The model configs are stored in a .js file (model-configs.js), and are exposed as properties in a JSON object (one object for openai, and one for bedrock). The model config is an object that is the value for a property/key the name of which is the model you want to use.  Passing that model config name as part of the URI is what allows the system to retrieve the correct model config.  You'll get an error or maybe the chicken pox if you use an unknown model name.  No one knows for sure.

You can get a list of model config names by hitting GET http://localhost:5000/list.  The URI to send your request to is POST http://localhost:5000/<serviceName>/<modelConfigName>, where <serviceName> is either "openai" or "bedrock".

Have fun!

llmtest is a node.js app using express.  It exposes a simple API for sending requests to various LLM's and viewing the results.  There is no front-end... you use something like Postman or API Dog, or an app that you write.

The current (July 2024) version supports LLM's hosted on Amazon AWS Bedrock, and OpenAI.  To use both of these services, you must have appropriate credentials / security keys from each service.

For Bedrock, you will need to create an access key for a user.  Follow good security practices : create a dedicated user for using bedrock, and limit that user's permissions to only using bedrock.  Once you have the access key and secret key created, be sure to copy them.  You will need to save them to environment variables on your machine (or save them to a .env file).

For OpenAI, the process is similar : browse to https://platform.openai.com/api-keys, log in, and create an api key for this app (I called mine "llmtest".)  Copy it and save it as an environment variable (or to .env).

The environment variable names you want to use are : 

AWS_DEFAULT_REGION=us-east-1
AWS_ACCESS_KEY_ID=<keyId>
AWS_ACCESS_SECRET_KEY=<secret>
OPENAI_API_KEY=<keyValue>

Note that AWS Bedrock must also be set up to allow access to the models you want to be able to test with.  I enabled them all :)  Also note that the models you enable will only be enabled in the region you have selected.  As of now (July 2024), the new Claude 3.5 Sonnet model is only available in the US-EAST-1 region.  If you plan to use 3.5 Sonnet, you need to enable that model (and all the models) in the US-EAST-1 region, then set that as your default region in your environment variable (or .env).  The modules in this app allow the region to be overriden when calling the "bedrock invoker", but you can't do that from Postman or API Dog etc.  I recommend enabling your Bedrock models in US-EAST-1, and setting that as your default region in .env.

To enable Bedrock models in us-east-1, browse to https://us-east-1.console.aws.amazon.com/bedrock, and open the left side menu (hamburger icon in the upper-left).  Then select "Model Access" at the bottom of the left panel.  There you can request access to be enabled for any/all models you care about.  It usually takes a few minutes before the models are available through your account, though.

Once you have your .env set up with your keys and default bedrock region, and you have bedrock models enabled (there is no need to do anything like that for openai), you are good to go.  Launch the app ("node ./index.js"), and it will start listening for REST API requests on port 5000 (set a PORT environment variable in .env to change this default).

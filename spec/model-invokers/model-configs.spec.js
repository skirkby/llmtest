import { AllModels, getInvoker } from '../../src/model-invokers/model-configs.js';

///////////////////////////////////////////
// Test the model configs
//
// This test will ensure that the model configs are correct and that the invokers
// can be loaded. 
//
///////////////////////////////////////////
describe('getInvoker', () => {
  it('should return the invoker for a model', async () => {
    const failures = [];

    for (const modelType in AllModels) {
      for (const modelName in AllModels[modelType]) {
        try {
          const modelConfig = AllModels[modelType][modelName];
          const module = await modelConfig.module();
          const invoker = modelConfig.invoker(module);
          expect(invoker).toBeDefined();
        } catch (error) {
          failures.push({ modelType, modelName});
        }
      }
    }

    if (failures.length > 0) {
      throw new Error(`Failed to get invokers for the following models: ${JSON.stringify(failures)}`);
    }
  });

  it('should return null if the model type AND name are not found', async () => {
    const invoker = await getInvoker('garbage', 'NotAModel');
    expect(invoker).toBeNull();
  });

  it('should return null if the model name is not found', async () => {
    const invoker = await getInvoker('bedrock', 'NotAModel');
    expect(invoker).toBeNull();
  });

});
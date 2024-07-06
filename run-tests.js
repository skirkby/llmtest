// run-tests.js
import { jasmine } from './spec/helpers/reporter.js';

// console.log('Current working directory:', process.cwd());
// console.log('Jasmine config:', JSON.stringify(jasmine.env.configuration(), null, 2));

jasmine.loadConfigFile('spec/support/jasmine.json');

// console.log('Specs to run:', jasmine.env.topSuite().children.map(child => child.getFullName()));

jasmine.execute();
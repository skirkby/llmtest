// spec/helpers/reporter.js
import { SpecReporter } from 'jasmine-spec-reporter';
import Jasmine from 'jasmine';

const jasmine = new Jasmine();
const env = jasmine.env;

env.clearReporters();
env.addReporter(new SpecReporter({
  spec: {
    displayPending: true,
    displayDuration: true
  },
  summary: {
    displayDuration: true,
    displaySuccessful: true,
    displayFailed: true,
    displayPending: true
  },
  colors: {
    success: 'green',
    failure: 'red',
    pending: 'yellow'
  }
}));

export { jasmine };

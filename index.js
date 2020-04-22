'use strict'
/** 
 * jsReporter
 * 
 * Collect stats of a test run and pass them to a callback
 * 
 * Example Usage (in karma.conf.js):
 *
 *   reporters: ['js'],
 *  
 *   jsReporter: function(testResults) {
 *     // Do something with tests results here
 *   }
 */
function jsReporter(baseReporterDecorator, formatError, config) {
  // The function that gets called after files are run
  // Defaults to process.stdout.write
  var a11yRegex = /to\.be\.accessible\(|isAccessible\(|isNotAccessible\(/g;

  var done = config || function(output){
    process.stdout.write(JSON.stringify(output, null, 2));
  };

  // Private variables to hold different test buckets
  var tests = [],
      pending = [],
      failures = [],
      successes = [];

  // Extend the base reporter
  baseReporterDecorator(this);

  this.specSuccess = function(browser, result) {
    successes.push(result);
  };

  this.specFailure = function(browser, result) {
    failures.push(result);
  };

  this.specSkipped = function(browser, results) {
    pending.push(...[].concat(results));
  };

  this.onRunComplete = function(browsers, results) {
    var output = {
      stats: results,
      pending: pending.map(clean),
      failures: failures.map(clean),
      successes: successes.map(clean)
    };

    // Tests are all done! 
    // pass them to our callback defined in config.jsReporter
    done(output);
  };

  function clean(test) {
    var cleaned = {
      title: test.description,
      description: test.suite.join(' ').concat(' ' + test.description),
      duration: test.time,
    }

    if (test.mocha && test.mocha.body) {
      cleaned.a11y = getA11YTestInfo(test.mocha && test.mocha.body);
    }

    if (test.log[0]) cleaned.err = errorToJSON(test.log[0]);
    return cleaned;
  }

  // Returns if a11y tests found in requested test and which rules have been ignored
  function getA11YTestInfo(body) {
    var found = body.match(a11yRegex);
    var ignored = body.match(/ignoredRules: \[(.+)\]/);
    
    if (!found) {
      return null;
    }
    
    return ignored ? ignored[1].replace(/\'|\s/g, '').split(',') : [];
  }

  function errorToJSON(error) {
    var formatted = formatError(error).split('\n');
    return {
      message: formatted[0],
      stack: formatted[1].trim()
    }
  }
}

// Inject dependencies
jsReporter.$inject = ['baseReporterDecorator', 'formatError', 'config.jsReporter'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:js': ['type', jsReporter]
};

# Karma JS Reporter
> send JSON results of a karma test to a callback function

## Usage
**karma.conf.js**
```js
// previous configuration ... 

reporters: ['js'],

jsReporter: function(testResults){
  // do something with testResults here
}

// ... more configuration
```

**Example output**
```js
{
  "stats": {
    "success": 11,
    "failed": 0,
    "error": false,
    "disconnected": false,
    "exitCode": 0
  },
  "pending": [],
  "failures": [],
  "successes": [
    {
      "title": "should be a function",
      "description": "each should be a function",
      "duration": 0
    },
    {
      "title": "should not return anything",
      "description": "each should not return anything",
      "duration": 0
    },
    {
      "title": "provide access to each value",
      "description": "each should iterate over arrays and provide access to each value",
      "duration": 1
    },
    {
      "title": "provide access to each index",
      "description": "each should iterate over arrays and provide access to each index",
      "duration": 0
    },
    {
      "title": "provide access to the original collection",
      "description": "each should iterate over arrays and provide access to the original collection",
      "duration": 0
    },
    {
      "title": "only iterate over numeric keys of an array, not all properties",
      "description": "each should iterate over arrays and only iterate over numeric keys of an array, not all properties",
      "duration": 1
    },
    {
      "title": "not use the native Array.prototype.forEach",
      "description": "each should iterate over arrays and not use the native Array.prototype.forEach",
      "duration": 1
    },
    {
      "title": "provide access to each value",
      "description": "each should iterate over objects and provide access to each value",
      "duration": 0
    },
    {
      "title": "provide access to each key",
      "description": "each should iterate over objects and provide access to each key",
      "duration": 0
    },
    {
      "title": "provide access to the original object",
      "description": "each should iterate over objects and provide access to the original object",
      "duration": 0
    },
    {
      "title": "not confuse an object with a `length` property for an array",
      "description": "each should iterate over objects and not confuse an object with a `length` property for an array",
      "duration": 0
    }
  ]
}
```

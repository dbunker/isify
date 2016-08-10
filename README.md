Isify
=====

Turn an asynchronous function with an expected last parameter callback function of form `(err, result) => {...}` into a promise that will throw the non-falsy error if present or send the results forward into then.

```
npm install --save isify
```

## Example

```js
const fs = require('fs')
const isify = require('isify')

// write "Hello World" to local file fileToWrite.txt
isify(fs.writeFile, './fileToWrite.txt', 'Hello World')
  .then(() => {
    console.log('Wrote file')
  })
  .catch(err => {
    console.log('Failed to write with error:', err)
  })
```

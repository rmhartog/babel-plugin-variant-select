# babel-plugin-variant-select



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-variant-select
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["variant-select"]
}
```

### Via CLI

```sh
$ babel --plugins variant-select script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["variant-select"]
});
```

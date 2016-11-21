# babel-plugin-variant-select



## Example

**In**

```js
// Set VARIANT_color environment variable to green
var color = Variant.select('color', {
  green: '#00fa00'
});
```

**Out**

```js
var color = '#00fa00';
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

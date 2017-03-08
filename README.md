# babel-plugin-variant-select

This plugin is very useful when you want to have
all config values for all enviroments in your source, but don't
want to ship them to all environments.

For instance, use this plugin to make sure your production API keys only end up
in the bundled javascript in production and not on every test server.

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

## Options

### VARIANT_OUTPUT_VALUES
Allows you to see all variants in the output.

**In**
```javascript
// Set process.env.VARIANT_OUTPUT_VALUES = 'true';
// Set process.env.VARIANT_color = 'green';
var color = Variant.select("color", {
  default: { val: 'default' },          
  green: { val: '#00fa00' },            
  red: { val: '#fa0000' },              
});                                     
```

**Out**
```javascript
var color = Object.defineProperty({ val: "#00fa00" }, "VARIANT_VALUES", {
  enumerable: false,
  value: {
    default: { val: "default" },
    green: { val: "#00fa00" },
    red: { val: "#fa0000" }
  }
});
```

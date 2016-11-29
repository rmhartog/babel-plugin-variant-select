const variantString = Object.keys(process.env)
  .filter((key) => key.startsWith('VARIANT_'))
  .sort()
  .map((key) => encodeURIComponent(key.substr(8)) + "=" + encodeURIComponent(process.env[key]))
  .join('&');

const config = {
  cacheVersion: variantString,
};

export default config;

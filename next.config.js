const path = require("path");

const moduleAliases = [
  "apollo",
  "components",
  "hoc",
  "layouts",
  "pages",
  "resources",
  "server",
  "style",
  "utils",
].reduce((accumulator, alias) => {
  console.log(path.join(__dirname, `/${alias}`));
  accumulator[alias] = path.join(__dirname, `/${alias}`);
  return accumulator;
}, {});

module.exports = {
  webpack: (config) => {
    config.resolve.alias = Object.assign(
      {},
      config.resolve.alias,
      moduleAliases
    );
    return config;
  },
};

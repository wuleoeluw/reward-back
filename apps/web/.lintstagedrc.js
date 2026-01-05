const path = require("path");

const buildEslintCommand = (filenames) =>
  `eslint --config apps/web-app/eslint.config.mjs --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`;

module.exports = {
  "!(*.{js,jsx,ts,tsx})": ["prettier --write --ignore-unknown"],
  "apps/web-app/src/**/*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"],
};

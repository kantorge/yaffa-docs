// Explicit empty PostCSS config so the parent project's postcss.config.js
// (which includes Tailwind CSS) is not picked up by the Docusaurus webpack build.
module.exports = {
  plugins: {},
};

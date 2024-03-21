// SEE: https://prettier.io/docs/en/options.html
// SEE: https://github.com/sveltejs/prettier-plugin-svelte?tab=readme-ov-file#options
module.exports = {
  plugins: ["prettier-plugin-svelte"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};

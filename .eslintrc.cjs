// SEE: https://eslint.org/docs/latest/rules/
// SEE: https://github.com/sveltejs/eslint-plugin-svelte?tab=readme-ov-file#white_check_mark-rules
module.exports = {
  extends: ["plugin:svelte/recommended", "plugin:svelte/prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    extraFileExtensions: [".svelte"],
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
};

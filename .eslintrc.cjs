// SEE: https://eslint.org/docs/latest/rules/
// SEE: https://github.com/sveltejs/eslint-plugin-svelte?tab=readme-ov-file#white_check_mark-rules
module.exports = {
  extends: ["plugin:svelte/recommended", "plugin:svelte/prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    extraFileExtensions: [".svelte"],
  },
  rules: {
    /* Possible Errors */
    "svelte/infinite-reactive-loop": "warn",
    "svelte/no-dom-manipulating": "error",
    "svelte/no-dupe-on-directives": "error",
    "svelte/no-dupe-use-directives": "error",
    "svelte/no-reactive-reassign": "warn",
    "svelte/no-store-async": "warn",
    "svelte/no-inline-styles": "error",
    /* Security Vulnerability */
    "svelte/no-target-blank": "error",
    /* Best Practices */
    "svelte/button-has-type": "error",
    "svelte/no-inline-styles": "error",
    "svelte/no-reactive-functions": "warn",
    "svelte/no-reactive-literals": "warn",
    "svelte/prefer-destructured-store-props": "warn",
    "svelte/require-each-key": "warn",
    "svelte/require-optimized-style-attribute": "error",
    "svelte/require-stores-init": "warn",
    "svelte/valid-each-key": "error",
    /* Stylistic Issues */
    "svelte/html-closing-bracket-spacing": "error",
    "svelte/html-quotes": "error",
    "svelte/html-self-closing": "error",
    "svelte/indent": "error",
    "svelte/no-extra-reactive-curlies": "error",
    "svelte/no-spaces-around-equal-signs-in-attribute": "error",
    "svelte/shorthand-attribute": "error",
    "svelte/shorthand-directive": "error",
    "svelte/sort-attributes": "error",
    "svelte/spaced-html-comment": "error",
    /* Extension Rules */
    "svelte/no-trailing-spaces": "error",
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

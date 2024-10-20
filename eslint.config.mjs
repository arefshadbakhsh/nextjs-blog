import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      quotes: ["error", "double"], // Enforces double quotes
      "comma-dangle": ["error", "always-multiline"], // Requires trailing commas where valid in ES5 (objects, arrays, etc.)
      semi: ["error", "always"], // Requires semicolons
      "react/jsx-uses-react": "off", // If using React 17+ (optional depending on your setup)
      "react/react-in-jsx-scope": "off", // Disable React import requirement in JSX (for React 17+)
      "sort-imports": [
        "error",
        {
          "ignoreCase": true,
          "ignoreDeclarationSort": true,
        },
      ],
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // Specific settings for CommonJS
    },
  },
  {
    languageOptions: {
      globals: globals.browser, // Adds browser globals (window, document, etc.)
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // eslintConfigPrettier,
];
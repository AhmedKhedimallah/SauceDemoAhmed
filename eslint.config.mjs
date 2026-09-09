import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import chaiFriendly from "eslint-plugin-chai-friendly";
import globals from "globals";

/**
 * Flat ESLint config (ESLint 9 + typescript-eslint).
 * - Type-unaware recommended rules (fast, no tsconfig project needed).
 * - Cypress + Mocha globals so `cy`, `Cypress`, `expect`, `before`… are known.
 * - eslint-config-prettier last: disables stylistic rules Prettier owns.
 */
export default tseslint.config(
  {
    ignores: [
      "node_modules",
      "cypress/reports",
      "**/*.js",
      "eslint.config.mjs",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        assert: "readonly",
      },
    },
    plugins: { "chai-friendly": chaiFriendly },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // chai assertions like `expect(x).to.not.be.undefined` are getters, not
      // no-ops: swap the base rule for the chai-aware one so idiomatic
      // assertions pass while real no-ops (e.g. `page.method;`) are still caught.
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "chai-friendly/no-unused-expressions": "error",
    },
  },
  eslintConfigPrettier
);

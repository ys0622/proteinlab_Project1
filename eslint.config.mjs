import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}", "lib/**/*.{js,jsx,ts,tsx}", "scripts/**/*.{js,mjs,ts}"],
  },
  {
    files: ["app/guides/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".deploy-src/**",
    ".deploy-wsl/**",
    ".deploy-wsl-*/**",
    ".open-next/**",
    ".wrangler/**",
    ".tmp-*/**",
    "node_modules/**",
    "public/**",
    "docs/**",
    "Bar image/**",
    "Bar spec/**",
    "RTD drink image/**",
    "RTD drink spec/**",
    "Shake image/**",
    "Shake spec/**",
    "yogurt image/**",
    "Yogurt spec/**",
    "deploy.cjs",
    "wrangler-fs-patch.cjs",
  ]),
]);

export default eslintConfig;

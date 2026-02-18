import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports"; // Asegúrate de haberlo instalado

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // 1. Limpieza automática de imports no usados
      "unused-imports/no-unused-imports": "error",

      // 2. Orden de imports (Crucial para leer código rápido)
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // 3. Menos 'any', más TypeScript real
      "@typescript-eslint/no-explicit-any": "warn",

      // 4. Consistencia en componentes (Arrow functions)
      "react/function-component-definition": [
        "error",
        { namedComponents: "arrow-function" },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
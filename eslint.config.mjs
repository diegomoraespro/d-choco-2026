import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Estende as regras padrões do Next.js e TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Suas regras de ignorar arquivos
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts"
    ]
  }
];

export default eslintConfig;
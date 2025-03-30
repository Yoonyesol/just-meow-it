import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import vitest from 'eslint-plugin-vitest';

export default defineConfig([
  // JavaScript 및 TypeScript 파일을 위한 설정
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  
  // 언어 옵션과 브라우저 글로벌 변수 설정
  { 
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], 
    languageOptions: { globals: { ...globals.browser, ...vitest.environments.env.globals } }
  },
  
  // 추천 ESLint 규칙 및 플러그인 확장
  { 
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { 
      js, 
      '@typescript-eslint': tseslint,
      react: pluginReact, 
      vitest: vitest,
      prettier 
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb',
      'airbnb/hooks',
      'airbnb-typescript',
      'plugin:@tanstack/eslint-plugin-query/recommended',
      'plugin:testing-library/react',
      'plugin:vitest/recommended',
      'prettier'
    ],
  },
  
  // 규칙 설정
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'arrow-body-style': 'off',
      'consistent-return': 'off',
      'object-curly-newline': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      'no-param-reassign': 'warn',
      'no-return-assign': 'warn',
      'no-unused-vars': 'warn',
      'no-cond-assign': 'off',
      'no-plusplus': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/no-array-index-key': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'warn',
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'vitest/valid-title': 'off',
      'jsx-a11y/label-has-associated-control': [
        2,
        { labelAttributes: ['htmlFor'] },
      ],
    },
  },
  
  // 무시할 파일 목록
  { 
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignorePatterns: [
      'dist', 'build', 'node_modules', 'public', '.history', '.eslintrc.cjs',
      'yarn.lock', 'postcss.config.js', 'tailwind.config.js',
    ],
  },
  
  // 파서 설정
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
      project: './tsconfig.json',
    },
  },
  
  // React 설정
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: { version: 'detect' },
    },
  },
]);

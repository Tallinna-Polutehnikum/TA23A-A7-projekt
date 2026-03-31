import js from "@eslint/js";
import globals from "globals";
import vue from "eslint-plugin-vue";

export default [
	{
		ignores: ["dist/**", "coverage/**", "node_modules/**"],
	},
	js.configs.recommended,
	...vue.configs["flat/essential"],
	{
		files: ["**/*.{js,mjs,cjs,vue}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				describe: "readonly",
				it: "readonly",
				expect: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly",
				vi: "readonly",
			},
		},
		rules: {
			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			"no-console": "off",
			"vue/multi-word-component-names": "off",
			"vue/no-unused-vars": "warn",
		},
	},
];

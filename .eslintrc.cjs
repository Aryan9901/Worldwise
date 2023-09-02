// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
//   settings: { react: { version: '18.2' } },
//   plugins: ['react-refresh'],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//   },
// }

// solution for eslint proptype error

module.exports = {
	env: { browser: true, es2020: true },
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"react/prop-types": "off",
		"no-unused-vars": ["warn", { vars: "local", args: "after-used", ignoreRestSiblings: true }],
	},
};

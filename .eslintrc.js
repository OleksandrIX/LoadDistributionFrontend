module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    overrides: [
        {
            env: {
                "node": true
            },
            files: [
                ".eslintrc.{js,cjs}"
            ],
            parserOptions: {
                "sourceType": "script"
            }
        }
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    plugins: [
        "@typescript-eslint",
        "react"
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "comma-dangle": ["error", "never"],
        "no-unused-vars": "off",
        "react/jsx-key": "off",
        "no-async-promise-executor": "off",
        "react-hooks/exhaustive-deps": "off"
    }
};

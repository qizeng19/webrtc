module.exports = {
  // 解析器 插件
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react-hooks",
    "prettier"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-empty-function":"off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "react/prop-types": "off",
    "react/display-name":"off",
    "no-extra-semi": 0, // 禁止不必要的分号
    "quotes": [
      "error",
      "single"
    ], // 强制使用单引号
    "no-unused-vars": 0,
    "no-irregular-whitespace": 2,
    "no-mixed-spaces-and-tabs": [2, false],
    "no-multi-spaces": 1, //不能用多余的空格,
    "react/no-string-refs": "off",
    "prettier/prettier": 2
  },
  "settings": { //自动发现React的版本，从而进行规范react代码
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  }
}
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "brace-style": [2, "stroustrup"],
    "max-len": ["error", {"code": 130, "ignoreUrls": true}],
    indent: ["error", 2],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", '@vue/standard'],
  rules: {
    allowEmptyReject: true
  },
  parserOptions: {
    parser: "babel-eslint"
  }
}

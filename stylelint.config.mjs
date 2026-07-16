/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-html/html"],
  rules: {
    "alpha-value-notation": "number",
    "unit-no-unknown": true,
    "function-linear-gradient-no-nonstandard-direction": true,
    "function-no-unknown": true,
    "no-unknown-animations": true,
  },
};

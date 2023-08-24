"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _globals = require("@wdio/globals");
var _page = _interopRequireDefault(require("./page.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends _page.default {
  /**
   * define selectors using getter methods
   */
  get flashAlert() {
    return (0, _globals.$)('#flash');
  }
}
var _default = new SecurePage();
exports.default = _default;
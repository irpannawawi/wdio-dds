"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
var _globals = require("@wdio/globals");
var _page = _interopRequireDefault(require("./page.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends _page.default {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return (0, _globals.$)('#username');
  }
  get inputPassword() {
    return (0, _globals.$)('#password');
  }
  get btnSubmit() {
    return (0, _globals.$)('button[type="submit"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open('login');
  }
}
var _default = new LoginPage();
exports.default = _default;
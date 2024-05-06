"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _globals = require("@wdio/globals");
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
class Page {
  /**
  * Opens a sub page of the page
  * @param path path of the sub page (e.g. /path/to/page.html)
  */
  open(path) {
    return _globals.browser.url("https://the-internet.herokuapp.com/".concat(path));
  }
}
exports.default = Page;
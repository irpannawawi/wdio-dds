"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
class Opentab {
  get tab1() {
    return $('/html/body/main/div/div/div/form/div[1]/span');
  }
  get tab2() {
    return $('/html/body/main/div/div/div/form/div[2]/span');
  }
  get tab3() {
    return $('/html/body/main/div/div/div/form/div[3]/span');
  }
  get tab4() {
    return $('/html/body/main/div/div/div/form/div[4]/span');
  }
  get tab5() {
    return $('/html/body/main/div/div/div/form/div[5]/span');
  }
  async openAll() {
    await this.tab1().click();
    await this.tab2().click();
    await this.tab3().click();
    await this.tab4().click();
    await this.tab5().click();
  }
}
var _default = new LoginPage();
exports.default = _default;
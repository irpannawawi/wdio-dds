"use strict";

require("core-js/modules/es.promise.js");
const Opentab = require('../pageobjects/opentab.page');
describe('My Login application', () => {
  it('open data', async () => {
    await browser.url('https://bos.polri.go.id/laporan/dds-warga');

    // open input page
    await $('/html/body/main/div[1]/div/div/div[1]/div/div/a').click();
    // open all tab
    // await OpenTab.openAll()
    // fill tanggal tab 1

    browser.debug();
  });
});
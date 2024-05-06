// # sandingtaman
// # 81051123

// # sukamantri
// # 88080845 

// # mekarwangi
// # 80061023

// # rajadesa
// # sirnabaya 83091356
// # tanjungsari 84121472
// # sukaharja 86090139
// # sirnajaya 01020191 

// cisaga
// mekarmukti 83100639 05101983
// tanjungjaya 84110454 01111984
// sukahurip 81011237 31011981
// sidamulya 85031549 09031985

import OpentabPage from '../pageobjects/opentab.page.js'
import FillTab from '../pageobjects/filltab.js'
import xlsx from 'node-xlsx';

const CONF_KECAMATAN = 'Rajadesa'
const CONF_DESA = 'Sirnabaya'
const CONF_SESI = 1
const CONF_START_ROW = 2
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
const workSheetsFromFile = xlsx.parse('./test/list/' + CONF_KECAMATAN.toLowerCase() + '/' + CONF_DESA.toLowerCase() + '/list_' + CONF_DESA.toLowerCase() + '_' + CONF_SESI + '.xlsx');

describe('My Bosv2 application' + CONF_KECAMATAN + CONF_DESA, async () => {
    it('Open the browser', async () => {
        await browser.url('https://bos.polri.go.id/laporan/dds-warga')

    })

    workSheetsFromFile[0].data.forEach((value, index) => {
        if (index == 0 || index < CONF_START_ROW) {
            return;
        }
        if (index > workSheetsFromFile[0].data.length - 1 || value[2] == undefined) {
            return false;
        }

        var nama = value[2]
        var provinsi = 'JAWA BARAT'
        var kabupaten = 'KABUPATEN CIAMIS'
        var kecamatan = CONF_KECAMATAN.toUpperCase()
        var desa = value[6]
        var rt = value[4]
        var rw = value[5]
        var dusun = value[3]
        var keterangan = value[7] + ' #' + generateString(20)
        var tanggal = value[1]

        it('insert data ' + index, async () => {
            try {

                console.log({ 'working on': index })
                // open input page
                await $('/html/body/main/div[1]/div/div/div[1]/div/div/a').waitForExist()
                await $('/html/body/main/div[1]/div/div/div[1]/div/div/a').click()
                // // fill data kepala keluarga tab 1
                await FillTab.fill_tab1(nama, provinsi, kabupaten, kecamatan, desa, dusun, rt, rw)

                // // fill tab 2 - tanggal kunjungan
                await FillTab.fill_tab2(tanggal)

                // // fill tab 3 - penerima kunjungan
                await FillTab.fill_tab3(nama)

                await FillTab.fill_tab4(keterangan)

                await FillTab.fill_tab5(keterangan)

                await FillTab.finish()

                await FillTab.close_modal()

            }
            catch (e) {
                console.log(e)
                await browser.url('https://bos.polri.go.id/laporan/dds-warga');
            }
        })
    })

})


import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import OpentabPage from '../pageobjects/opentab.page.js'
import FillTab from '../pageobjects/filltab.js'
import xlsx from 'node-xlsx';

const CONF_KECAMATAN = 'Rajadesa'
const CONF_DESA = 'Sirnabaya'

describe('My Bosv2 application', async () => {
    it('Open the browser', async ()=>{
        await browser.url('https://bos.polri.go.id/laporan/dds-warga')
    })
    
    const workSheetsFromFile = xlsx.parse('./test/list/'+CONF_KECAMATAN.toUpperCase()+'/'+CONF_DESA.toLowerCase()+'/list_'+CONF_DESA.toLowerCase()+'_1.xlsx');

    workSheetsFromFile[0].data.forEach((value, index) => {
        if(index == 0)
        {
            return;
        }
        var nama = value[2]
        var provinsi = 'JAWA BARAT'
        var kabupaten = 'KABUPATEN CIAMIS'
        var kecamatan = CONF_KECAMATAN.toUpperCase()
        var desa = value[6]
        var rt = value[4]
        var rw = value[5]
        var dusun = value[3]
        var keterangan = value[7]
        var tanggal = value[1]

        it('insert data '+index, async () => {
    
            // open input page
            await $('/html/body/main/div[1]/div/div/div[1]/div/div/a').click()
            // open all tab
            await OpentabPage.openAll()
    
            // fill data kepala keluarga tab 1
            await FillTab.fill_tab1(nama, provinsi, kabupaten, kecamatan, desa, dusun, rt, rw)
    
            // fill tab 2 - tanggal kunjungan
            await FillTab.fill_tab2(tanggal)
    
            // fill tab 3 - penerima kunjungan
            await FillTab.fill_tab3(nama)
    
            await FillTab.fill_tab4(keterangan)
    
            await FillTab.fill_tab5(keterangan)
    
            await FillTab.finish()
            
            await FillTab.close_modal()
    
        })
    })

})


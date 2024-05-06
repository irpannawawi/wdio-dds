import axios from 'axios';
import { Key } from 'webdriverio';
import { expect } from '@wdio/globals'
import OpentabPage from './opentab.page.js';

class FillTab {
    async fill_tab1(nama, provinsi, kabupaten, kecamatan, desa, dusun, rt, rw) {

        // open page
        await Promise.all([
            //  Tab 1
            OpentabPage.tab.waitForDisplayed(),
            OpentabPage.tab.click(),
            $('#nama_kepala_keluarga').addValue(nama),
            browser.execute(async (kab,kec, ds) => {
                await axios.post("https://bos.polri.go.id/laporan/buat-laporan/kota", { id: 32 })
                    .then(function (response) {
                        $('#kabupaten').empty()
                        $('#kabupaten').append(`<option value="">-- pilih kota/kabupaten -- </option>`)
                        $.each(response.data, function (id, name) {
                            $('#kabupaten').append(`<option value='${name}' id='${id}'> ${name} </option>`)
                        })
                    })
    
                // get list kecamatan kd kab 3207 / cms
                await axios.post("https://bos.polri.go.id/laporan/buat-laporan/kecamatan", { id: 3207 })
                    .then(function (response) {
                        $('#kecamatan').empty()
                        if ("") {
                            let append = `<option value="">-- pilih kecamatan --</option>`
                            $('#kecamatan').append(append)
                        }
                        else {
                            let append = `<option value="">-- pilih kecamatan --</option>`;
                            $('#kecamatan').append(append);
                        }
                        $.each(response.data, function (id, name) {
                            $('#kecamatan').append(`<option value='${name}' id='${id}'> ${name} </option>`)
                        })
                    })
                let kd_kec = 320713
                // get list desa  kd kec 320713 /
                if (kec == 'RAJADESA') {
                    kd_kec = 320713
                }
                if (kec == 'PANJALU') {
                    kd_kec = 320708
                }
                if (kec == 'SUKAMANTRI') {
                    kd_kec = 320733
                }
                if(kec == 'CISAGA')
                {
                    kd_kec = 320730 
                }
                
                console.log({
                    kab: kab,
                    kec: kec,
                    ds:ds
                })
                await axios.post("https://bos.polri.go.id/laporan/buat-laporan/desa", { id: kd_kec })
                    .then(function (response) {
                        $('#desa').empty();
                        $('#desa').append(`<option value="">-- pilih kelurahan/desa -- </option>`)
                        $.each(response.data, function (id, name) {
                            $('#desa').append(`<option value='${name}' id='${id}'> ${name} </option>`)
                        })
                    }).then(() => {
                        console.log(kec)
                        $('#provinsi').val("JAWA BARAT")
                        $('#kabupaten').val("KABUPATEN CIAMIS")
                        $('#kecamatan').val(kec.toUpperCase())
                        $('#desa').val(ds)
    
                    })
    
            }, kabupaten, kecamatan, desa ),

            // dusun 
            $('#detail_alamat_kepala_keluarga').addValue(dusun),
    
            // rt 
            $('#rt_kepala_keluarga').clearValue(),
            $('#rt_kepala_keluarga').addValue(rt),
    
            // rw
            $('#rw_kepala_keluarga').clearValue(),
            $('#rw_kepala_keluarga').addValue(rw),
        ])


    }

    async fill_tab2(tgl) {

        let tanggal = tgl.split('-')
        await Promise.all([
            //  Tab 1
            OpentabPage.tab2.waitForDisplayed(),
            OpentabPage.tab2.click(),
            // browser.execute(()=>{
            //     $('#collapseCatatanKunjunganWarga').collapse('show')
            // }),
            $('#tanggal').waitForDisplayed(),
            browser.execute((tanggal)=>{
                $('#tanggal').val(tanggal)
            }, tgl), 
        ])
    }

    async fill_tab3(nama) {
        await Promise.all([
            OpentabPage.tab3.waitForDisplayed(),
            OpentabPage.tab3.click(),
            $('#nama_penerima_kunjungan').setValue(nama),
            $('#status_penerima_kunjungan').selectByAttribute('value', 'kepala keluarga')
        ])
    }

    async fill_tab4(keterangan) {
        await Promise.all([
            console.log('tab 4'),
            OpentabPage.tab4.waitForDisplayed(),
            OpentabPage.tab4.click(),
            console.log('tab 4 done'),
            $('#bidang-keluhan').selectByAttribute('value', 'EKONOMI'),
            $('#uraian-keluhan').setValue(keterangan),
    
            browser.execute(() => {
                $('#keyword_keluhan').append('<option value="Ekonomi warga">Ekonomi Warga</option>')
                $('#keyword_keluhan').val('Ekonomi warga')
                $('#keyword_keluhan').change()
                $('#keyword_keluhan').trigger('change')
            }),
        ])

    }

    async fill_tab5(keterangan) {
        await Promise.all([
            OpentabPage.tab5.waitForDisplayed(),
            OpentabPage.tab5.click(),
            console.log('tab 5'),
            
            $('#ekonomi').click(),
            $('#uraian-informasi').addValue(keterangan),
            console.log('tab 5 done'),
            
        ])
        browser.execute(async () => {
            await $('#select-keyword-informasi').val('Warga Berpenghasilan Rendah')
            await $('#select-keyword-informasi').change()
            await $('#select-keyword-informasi').trigger('change')
        })
    }

    async finish() {
        await $('//*[@id="form_dds_warga"]/div[6]/button[2]').click()
    }

    async close_modal() {
        await Promise.all([
            $('/html/body/div[3]/div/div[3]/button[1]').waitForExist(),
            $('/html/body/div[3]/div/div[3]/button[1]').click(),
        ])
    }

}

export default new FillTab();
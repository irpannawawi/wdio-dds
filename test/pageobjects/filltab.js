import axios from 'axios';
import { Key } from 'webdriverio';
import { expect } from '@wdio/globals'

class FillTab {
    async fill_tab1(nama, provinsi, kabupaten, kecamatan, desa, dusun, rt, rw) {
        // nama
        await $('#nama_kepala_keluarga').addValue(nama)

        await browser.execute(async (kab,kec, ds) => {
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

        }, kabupaten, kecamatan, desa )
        
        // provinsi
        // await $('#provinsi').addValue(provinsi)
        // kabupaten 
        // await $('option[value="' + kabupaten + '"]').waitForExist()
        // await $('#kabupaten').addValue(kabupaten)

        // // kecamatan
        // await $('option[value="' + kecamatan + '"]').waitForExist()
        // await $('#kecamatan').addValue(kecamatan)

        // // desa 
        // await $('option[value="' + desa + '"]').waitForExist()
        // await $('#desa').addValue(desa)

        // dusun 
        await $('#detail_alamat_kepala_keluarga').addValue(dusun)

        // rt 
        await $('#rt_kepala_keluarga').clearValue()
        await $('#rt_kepala_keluarga').addValue(rt)

        // rw
        await $('#rw_kepala_keluarga').clearValue()
        await $('#rw_kepala_keluarga').addValue(rw)

    }

    async fill_tab2(tgl) {
        await browser.execute(()=>{
            $('#collapseCatatanKunjunganWarga').collapse('show')
        })
        await $('#tanggal').waitForDisplayed()
        await $('#tanggal').setValue(tgl)
    }

    async fill_tab3(nama) {
        await $('#nama_penerima_kunjungan').setValue(nama)
        await $('#status_penerima_kunjungan').selectByAttribute('value', 'kepala keluarga')
    }

    async fill_tab4(keterangan) {
        await $('#bidang-keluhan').selectByAttribute('value', 'EKONOMI')
        await $('#uraian-keluhan').setValue(keterangan)

        await browser.execute(() => {
            $('#keyword_keluhan').append('<option value="Ekonomi warga">Ekonomi Warga</option>')
            $('#keyword_keluhan').val('Ekonomi warga')
            $('#keyword_keluhan').change()
            $('#keyword_keluhan').trigger('change')
        })

    }

    async fill_tab5(keterangan) {
        await $('#ekonomi').click()
        await $('#uraian-informasi').addValue(keterangan)
        await browser.execute(() => {
            $('#select-keyword-informasi').val('Warga Berpenghasilan Rendah')
            $('#select-keyword-informasi').change()
            $('#select-keyword-informasi').trigger('change')
        })
    }

    async finish() {
        await browser.execute(() => {

        })
        await $('//*[@id="form_dds_warga"]/div[6]/button[2]').click()
    }

    async close_modal() {
        await $('/html/body/div[3]/div/div[3]/button[1]').waitForExist()
        await $('/html/body/div[3]/div/div[3]/button[1]').click()
    }




}

export default new FillTab();
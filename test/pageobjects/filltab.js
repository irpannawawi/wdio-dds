import axios from 'axios';
import { Key } from 'webdriverio';
import { expect } from '@wdio/globals'

class FillTab {
    async fill_tab1(nama, provinsi, kabupaten, kecamatan, desa, dusun, rt, rw) {
        // nama
        await $('#nama_kepala_keluarga').addValue(nama)

        // provinsi
        await $('#provinsi').addValue(provinsi)

        // kabupaten 

        await $('option[value="' + kabupaten + '"]').waitForExist()
        await $('#kabupaten').addValue(kabupaten)

        // kecamatan
        await $('option[value="' + kecamatan + '"]').waitForExist()
        await $('#kecamatan').addValue(kecamatan)

        // desa 
        await $('option[value="' + desa + '"]').waitForExist()
        await $('#desa').addValue(desa)

        // dusun 
        await $('#detail_alamat_kepala_keluarga').addValue(dusun)

        // rt 
        await $('#rt_kepala_keluarga').clearValue()
        await $('#rt_kepala_keluarga').addValue(rt)
        
        // rw
        await $('#rw_kepala_keluarga').clearValue()
        await $('#rw_kepala_keluarga').addValue(rw)

    }

    async fill_tab2(tgl)
    {
        await $('#tanggal').setValue(tgl)
    }

    async fill_tab3(nama)
    {
        await $('#nama_penerima_kunjungan').setValue(nama)
        await $('#status_penerima_kunjungan').selectByAttribute('value', 'kepala keluarga')
    }
    
    async fill_tab4(keterangan)
    {
        await $('#bidang-keluhan').selectByAttribute('value', 'EKONOMI')
        await $('#uraian-keluhan').setValue(keterangan)

        await browser.execute(()=>{
            $('#keyword_keluhan').append('<option value="Ekonomi warga">Ekonomi Warga</option>')
            $('#keyword_keluhan').val('Ekonomi warga')
            $('#keyword_keluhan').change()
            $('#keyword_keluhan').trigger('change')
        })
        
    }

    async fill_tab5(keterangan)
    {
        await $('#ekonomi').click()
        await $('#uraian-informasi').addValue(keterangan)
        await browser.execute(()=>{
            $('#select-keyword-informasi').val('Warga Berpenghasilan Rendah')
            $('#select-keyword-informasi').change()
            $('#select-keyword-informasi').trigger('change')
        })
    }

    async finish()
    {
        await $('//*[@id="form_dds_warga"]/div[6]/button[2]').click()
    }
    
    async close_modal()
    {
        await $('//*[@id="form_dds_warga"]/div[6]/button[2]').click()
    }

    


}

export default new FillTab();
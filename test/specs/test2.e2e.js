// # sandingtaman
// # 81051123

// # sukamantri
// # 88080845 

// # mekarwangi --- BL
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
import axios from 'axios';
import xlsx from 'node-xlsx';

const CONF_KECAMATAN = 'Rajadesa'
const CONF_DESA = 'Sirnabaya'
const CONF_START_ROW = 2
const CONF_END_ROW = 210
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
const workSheetsFromFile = xlsx.parse('./test/list/' + CONF_KECAMATAN.toLowerCase() + '/' + CONF_DESA.toLowerCase() + '/list_' + CONF_DESA.toLowerCase() +'.xlsx');

describe('DDS Warga', async () => {

    workSheetsFromFile[0].data.forEach((value, index) => {
        if (index == 0 || index < CONF_START_ROW || index > CONF_END_ROW) {
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
        
        try {
        console.log('opening tab1')
        // open login page
        it('Open the browser', async () => {
            await browser.url('https://bos.polri.go.id/laporan/dds-warga')
    
        })
    
        it('Open insert page', async () => {

            await browser.url('https://bos.polri.go.id/laporan/dds-warga/create')
            await $('/html/body/main/div/div/div/form/div[1]/span').waitForDisplayed()
        })

        it('fill tab 1', async () => {
            let tab1 = $('/html/body/main/div/div/div/form/div[1]/span')
            await tab1.waitForDisplayed() 
            await tab1.click()
            await $('/html/body/main/div/div/div/form/div[1]/span').scrollIntoView()
            $('#nama_kepala_keluarga').addValue(nama)
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
    
            }, kabupaten, kecamatan, desa )
            // dusun 
            await $('#detail_alamat_kepala_keluarga').addValue(dusun)
    
            // rt 
            await $('#rt_kepala_keluarga').clearValue()
            $('#rt_kepala_keluarga').addValue(rt)
    
            // rw
            await $('#rw_kepala_keluarga').clearValue()
            await $('#rw_kepala_keluarga').addValue(rw)
        })

        it('fill tab 2', async () =>  {
            let tab2 = $('/html/body/main/div/div/div/form/div[2]/span') 
            
            // fill tab 2
            await tab2.waitForDisplayed()
            await tab2.click()
            await tab2.scrollIntoView({ block: 'center', inline: 'center' })
            
            await $('#tanggal').waitForDisplayed(),
            await browser.execute((tanggal)=>{
                console.log('Tanggal :'+tanggal)
                $('#tanggal').val(tanggal)
            }, tanggal)
        })

        it('fill tab 3', async () =>  {
            let tab3 = $('/html/body/main/div/div/div/form/div[3]/span') 
            let tab4 = $('/html/body/main/div/div/div/form/div[4]/span') 
            let tab5 = $('/html/body/main/div/div/div/form/div[5]/span') 
            await tab3.click()
            await tab3.scrollIntoView()
            $('#nama_penerima_kunjungan').setValue(nama),
            $('#status_penerima_kunjungan').selectByAttribute('value', 'kepala keluarga')
            // fill tab 3
        })

        it('fill tab 4', async () =>  {
            let tab4 = $('/html/body/main/div/div/div/form/div[4]/span') 
            let tab5 = $('/html/body/main/div/div/div/form/div[5]/span') 
            await tab4.click()
            await tab4.scrollIntoView()
            $('#bidang-keluhan').selectByAttribute('value', 'EKONOMI')
            $('#uraian-keluhan').setValue(keterangan)
    
           await browser.execute(() => {
                $('#keyword_keluhan').append('<option value="Ekonomi warga">Ekonomi Warga</option>')
                $('#keyword_keluhan').val('Ekonomi warga')
                $('#keyword_keluhan').change()
                $('#keyword_keluhan').trigger('change')
            })
            // fill tab 3
        })

        it('fill tab 5', async () =>  {
            let tab5 = $('/html/body/main/div/div/div/form/div[5]/span') 
            await tab5.scrollIntoView()
            await tab5.click()
            await $('#ekonomi').click()
            await $('#ekonomi').scrollIntoView()
            
            await $('#uraian-informasi').addValue(keterangan)
            await $('#uraian-informasi').scrollIntoView()
    
            await browser.execute(async () => {
                await $('#select-keyword-informasi').val('Warga Berpenghasilan Rendah')
                await $('#select-keyword-informasi').change()
                await $('#select-keyword-informasi').trigger('change')
            })
            // fill tab 3
        })

        it('submit', async () =>  {
            let submit = $('//*[@id="form_dds_warga"]/div[6]/button[2]') 
            await submit.scrollIntoView()
            await submit.click()
        })

        } catch (error) {
            //    close all floating window
            it('close error', async () => {
                await $('/html/body/div[5]/div/div[3]/button[1]').click()
            })
        }
    });

})

describe('Deteksi dini', async () => {
    workSheetsFromFile[0].data.slice(1, 5).forEach((value, index) => {


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
        
        it('open page deteksi dini', async () => {
            await browser.url('https://bos.polri.go.id/laporan/deteksi-dini/create');
            await $('/html/body/main/div/form/span[1]/h5').waitForDisplayed()
        })
        
        it('fill form 1', async () => {
            let isExist = await $('/html/body/div[5]/div/div[3]/button[1]').isExisting()
            if(isExist) {
                await $('/html/body/div[5]/div/div[3]/button[1]').click()
            }
            let form1 = $('/html/body/main/div/form/span[1]/h5')
            await form1.scrollIntoView()
            await form1.click()
            // fill form 1
            await $('#nama_narasumber').setValue(nama)
            await $('#pekerjaan').setValue('Wiraswasta')
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
    
            }, kabupaten, kecamatan, desa )
             // dusun 
             $('#detail_alamat').addValue(dusun)
    
             // rt 
             $('#rt').clearValue()
             $('#rt').addValue(rt)
     
             // rw
             $('#rw').clearValue()
             $('#rw').addValue(rw)

        })
            
        it('fill form 2', async () => {
            let form2 = $('/html/body/main/div/form/span[2]/h5')
            await form2.waitForDisplayed()
            await form2.scrollIntoView()
            await form2.click()


            // fill form 2
            await $('#tanggal').setValue(tanggal)
            await $('#jam_mendapatkan_informasi').clearValue()
            await $('#jam_mendapatkan_informasi').setValue('13:00')
            await $('#lokasi_mendapatkan_informasi').setValue('Rumah Narasumber')
            
        })

        it('fill form 3', async () => {
            let form3 = $('/html/body/main/div/form/span[3]/h5')
            await form3.waitForDisplayed()
            await form3.scrollIntoView()
            await form3.click()


            // fill form 3
            // checkbox 
            let chk = await $('/html/body/main/div/form/div[3]/div[1]/div/div/div[2]/input')
            await chk.scrollIntoView()
            await chk.click()

            await $('#uraian_informasi').setValue(keterangan)
            browser.execute(() => {
                $('#select-keyword-informasi').append('<option value="Ekonomi warga">Ekonomi Warga</option>')
                $('#select-keyword-informasi').val('Ekonomi warga')
                $('#select-keyword-informasi').change()
                $('#select-keyword-informasi').trigger('change')
            })
            
        })

        it('submit', async () =>  {
            let submit = $('/html/body/main/div/form/div[4]/button') 
            await submit.scrollIntoView()
            await submit.click()
        })
    })
    
}) //describe


describe('PS2', async () => {

    workSheetsFromFile[0].data.slice(1, 5).forEach((value, index) => {
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
       
       
        it('open page', async () => {
            await browser.url('https://bos.polri.go.id/laporan/problem-solving/non-sengketa/create')
            
        })

        it('send post data', async () => {
            let token = await $('meta[name="csrf-token"]').getAttribute('content')
            await browser.execute(async (token, tanggal, keterangan, nama, kabupaten, kecamatan, desa, rt, rw, dusun) => {
                await axios.post("https://bos.polri.go.id/laporan/problem-solving/non-sengketa", {
                    '_token': token,
                    'tanggal_kejadian': tanggal,
                    'waktu_kejadian': '13:00',
                    'lokasi_kejadian': 'Kantor Desa',
                    'uraian_masalah': keterangan,
                    'keyword': ['Ekonomi warga'],
                    'nama_narasumber': nama,
                    'pekerjaan_narasumber': 'Wiraswasta',
                    'alamat_narasumber': `Dusun ${dusun}, RT ${rt}, RW ${rw}, ${desa}, ${kecamatan}, ${kabupaten}`,
                    'pihak_terlibat': 'Kepala desa',
                    'hari_selesai': 'Senin',
                    'tanggal_selesai': tanggal,
                    'uraian_solusi': keterangan
                }).then((response) => {
                    console.log(response)
                })
            }, token, tanggal, keterangan, nama, kabupaten, kecamatan, desa, rt, rw, dusun)

        })

    
        // it('fill form 1', async () => {
        //     let panel1 = await $('/html/body/main/div/form/span[1]/h5')
        //     await panel1.waitForDisplayed()
        //     await panel1.scrollIntoView()
        //     await panel1.click()
        //     let bln = await tanggal.slice(5, 7)
    
        //     await browser.execute((bln) => {
        //         $('#tanggal_kejadian').val(`2024-${bln}-20`)
        //         $('#waktu_kejadian').val()
        //         $('#waktu_kejadian').val('13:00')
        //         $('#lokasi_kejadian').val('Kantor Desa')
                
        //     }, bln)
    
        //     await $('#uraian_masalah').setValue(keterangan)
        //     await browser.execute(() => {
        //         $('#select-keyword').append('<option value="Ekonomi warga">Ekonomi Warga</option>')
        //         $('#select-keyword').val('Ekonomi warga')
        //         $('#select-keyword').change()
        //         $('#select-keyword').trigger('change')
        //     })
        //     await browser.pause(1000)
        // })

        // it('fill form 2', async () => {
        //     let panel2 = await $('//*[@id="form_ps_non_sengketa"]/span[2]')
        //     await panel2.scrollIntoView()
        //     await panel2.click()

        //     // fill form 2
        //     await $('#nama_narasumber').setValue(nama)
        //     await $('#pekerjaan_narasumber').setValue('Wiraswasta')
        //     await $('#alamat_narasumber').setValue('Dsn.'+dusun+', RT.'+rt+', RW.'+rw+', Kec. '+kecamatan)
        // })

        // it('fill form 3', async () => {
        //     let panel3 = await $('/html/body/main/div/form/span[3]')
        //     await panel3.scrollIntoView()
        //     await panel3.click()

        //     // fill form 3
        //     await $('#pihak_terlibat').setValue('Kepala desa,bhabinkamtibmas,bhabinsa,'+nama)
        //     await $('#hari_selesai').selectByVisibleText('Senin')
        //     let bln = await tanggal.slice(5, 7)
        //     await $('#tanggal_selesai').setValue(bln+'/29/2024')
        //     await $('#uraian_solusi').setValue(keterangan)
        // })

        // it('submit', async () =>  {
        //     let submit = await $('/html/body/main/div/form/div[4]/button') 
        //     await submit.scrollIntoView()
        //     await submit.click()
        //     await browser.pause(3000)
        // })
    })
})

describe('logout', async () => {
    it('open profile', async () => {
        await browser.url('https://bos.polri.go.id/profile')
    })
    it('logout', async () => {
        await $('/html/body/div[3]/div[3]/div/div/form/button').scrollIntoView()
        await $('/html/body/div[3]/div[3]/div/div/form/button').waitForDisplayed()
        await $('/html/body/div[3]/div[3]/div/div/form/button').click()
        await $('//*[@id="username"]').waitForDisplayed()

    })
})




import xlsx from 'node-xlsx';
const CONF_KECAMATAN = 'Rajadesa'
const CONF_DESA = 'Tanjungsari'
const CONF_SESI = 2
const CONF_START_ROW = 1

const workSheetsFromFile = xlsx.parse('./test/list/rajadesa/tanjungsari/list_' + CONF_DESA.toLowerCase() + '_' + CONF_SESI + '.xlsx');

console.log(workSheetsFromFile[0].data.length)
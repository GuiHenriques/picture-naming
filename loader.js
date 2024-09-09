const xlsx = require("xlsx");

const workbook = xlsx.readFile("orders.xlsx");

// Selecionar planilha
const sheets = workbook.SheetNames.map(sheetName => workbook.Sheets[sheetName]);

// Converter planilha para json
const data = xlsx.utils.sheet_to_json(sheets[0]);

console.log(data[0].FILLER);

// {
//   TRIAL: 1,
//   BLOCO: 1,
//   FILLER: 'PICTURE_7',
//   'LANGUAGE FILLER': 'BP',
//   EXPERIMENTALPICTURE1: 'PICTURE_8',
//   'LANGUAGE EXPERIMENTAL PICTURE 1': 'EN',
//   EXPERIMENTALPICTURE2: 'PICTURE_9',
//   'LANGUAGE EXPERIMENTAL PICTURE 2': 'BP',
//   CONDITION: 1
// }

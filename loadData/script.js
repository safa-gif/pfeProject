var xlsx = require ("xlsx");

var wb_1 = xlsx.readFile('../ressources/commande.xlsx', {cellDate: true, cellStyles:true});
var wb_2 = xlsx.readFile('../ressources/stock.xlsx', {cellDate: true, cellStyles:true});
var wb_3 = xlsx.readFile('../ressources/carnetDeCommande.xlsx', {cellDate: true, cellStyles:true});
var wb_4 = xlsx.readFile('../ressources/PDP.xlsx', {cellDate: true, cellStyles:true});

var ws_1 = wb_1.Sheets['Feuil1'];
var ws_2 = wb_2.Sheets['Feuil1'];
var ws_3 = wb_3.Sheets['Feuil1'];
var ws_4 = wb_4.Sheets['Feuil1'];

var data = xlsx.utils.sheet_to_json(ws_1);
var data2 = xlsx.utils.sheet_to_json(ws_2);
var data3 = xlsx.utils.sheet_to_json(ws_3);
var data4 = xlsx.utils.sheet_to_json(ws_4);

// var data = xlsx.utils.sheet_to_json(wb_1)

// console.log(data);
// if()
console.log(wb_4);


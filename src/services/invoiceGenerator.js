/// idea data shape from front
/**
 * @param data - instruction: {vat:true/false. split: true/false, databaseId: "idNumber/unqiueIdentifier"}
 * @function fetchSpecificData - fetch data from CORESPODING db; ex get specific document by _id from pendingTickets collection
 **/

const fetchSpecificData = require("./mockData");
const mock = { vat: true, split: true, datbaseId: "OO" };
const invoiceGenerator = (data) => {
  const fetchedData = fetchSpecificData;
  // to be saved in summary Sales;
  let sumSales = 0;
  let sumVat = 0 ;
  let sumTotal = 0;
  // to be render back for invoice generator;
  let paymentDetail = [];
  fetchedData.details.forEach((p)=>{

    let tempSumSales =0;
    let tempSumVat =0;
    let tempSumTotal =0;
    let tempArray = [];

    p.details.forEach((item)=>{
      let sales = item.price*item.amount;
      tempSumSales += sales;
      let vat = 0;
      data.vat? vat=Math.round((sales*0.07)*100)/100:0;
      tempSumVat +=vat;
      let grandTotal = sales+vat;
      tempArray =[...tempArray,{detail:item.name, amount: item.amount, price: item.price, grossTotal: sales, grandVat:vat, grandTotal: grandTotal}];
      tempSumTotal += grandTotal;
    });

    paymentDetail = [...paymentDetail,{grossTotal: tempSumSales, grandVat:tempSumVat, grandTotal: tempSumTotal, details:tempArray}];
    sumSales+= tempSumSales;
    sumVat+= tempSumVat;
    sumTotal += tempSumTotal;
  });
  // to be used for another services
  let dbWritingOperation = {id:mock.datbaseId, payload:{grossTotal: sumSales, grandVat:sumVat, grandTotal: sumTotal}};
  // sent back to front-end;
  let payload = {id:mock.datbaseId, transientData: paymentDetail, tbd: dbWritingOperation};
  return payload;
};
invoiceGenerator(mock);

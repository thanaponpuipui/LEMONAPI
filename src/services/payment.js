// payment service.

/**
 * @typedef {Object} order
 * @property {string} id
 * @property {string} branchId
 * @property {string} orderType
 * @property {Date} orderedTime
 * @property {boolean} isPaid
 * @property {Date} closedTime
 */

/**
 * @param {string} orderId
 * @param {Array.<string>} splitProduct array of product id.
 * @returns {}
 */
async function splitBill (orderId, splitProduct) {
  
  return {orderId, splitProduct};
}

async function confirmPayment () {
  
}

/**
 * @typedef {Object} invoiceOptionObj
 * @property {boolean} includeVat make generator include vat.
 * @property {number} vatMultiplier percentage of vat 1 = 100%.
 */ 
/**
 * @typedef {Object} invoice
 * @property {string} id
 * @property {number} vat
 * @property {number} grossTotal
*/

/**
 * generate invoice of 
 * @param {string} oId order id.
 * @param {invoiceOptionObj} option Function's instruction.
 * @returns {invoice}
 */

async function generateInvoice (oId, {includeVat=false, vatMultiplier=0.07}) {
  if (typeof oId !== 'string') {
    throw new Error('Generate invoice required string type order-id.');
  }

  // mockup function order is paid.
  async function isPaid (id) {
    if (!id) return;
    return true;
  }
  // check if the order is paid. only generate invoice of paid order.
  if (await !isPaid(oId)) throw new Error('Please pay the bill before generate invoice.');

  // muckup function.
  async function findAllItemsInOrder (id) {
    if (!id) return;
    return {projectName: 'rice', price: '10', amount: '2'};
  }

  const invoice = {
    orderId: oId,
  };

  const itemsList = await findAllItemsInOrder(oId);

  const grossPrice = itemsList.reduce((acc, cur) => {
    return acc + (cur.price * cur.amount);
  }, 0);
  invoice.totalPrice = grossPrice;

  if (includeVat) {
    const vatPrice = grossPrice * vatMultiplier;
    invoice.vatPrice = vatPrice;
  }

  return invoice;

}

module.expors = {
  splitBill,
  confirmPayment,
  generateInvoice
};

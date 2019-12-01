const Big = require("big.js");

function updateValuesInDolar(ofxData) {
  let didDolarUpdate = false;
  let correctionDueDolarUpdate = false;

  if (isCredcard(ofxData)) {
    const transactions = getTransactions(ofxData);

    const correctionTransaction =
      transactions.find(t => t.CURRENCY) || transactions[0];

    transactions
      .filter(t => t.CURRENCY)
      .forEach(t => {
        const amount = Big(t.TRNAMT);
        const curRate = Big(t.CURRENCY.CURRATE);
        const newAmount = amount.times(curRate);
        t.TRNAMT = newAmount.toFixed(2);
        delete t.CURRENCY;
        didDolarUpdate = true;
      });

    if (didDolarUpdate) {
      const invoiceTotalVal = Big(invoiceTotal(ofxData));
      const transactionsTotalVal = Big(transactionsTotal(ofxData));
      const dif = invoiceTotalVal.minus(transactionsTotalVal);

      if (!dif.eq(Big(0))) {
        correctionTransaction.TRNAMT = dif
          .plus(Big(correctionTransaction.TRNAMT))
          .toFixed(2);
        correctionTransaction.MEMO += " (corrigido)";
        correctionDueDolarUpdate = true;
      }
    }
  }

  return {
    didDolarUpdate,
    correctionDueDolarUpdate
  };
}

function isCredcard(ofxData) {
  return (
    ofxData.OFX.CREDITCARDMSGSRSV1 &&
    ofxData.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN
  );
}

function invoiceTotal(ofxData) {
  return ofxData.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.LEDGERBAL.BALAMT;
}

function transactionsTotal(ofxData) {
  return getTransactions(ofxData)
    .filter(t => !t.MEMO.includes("PGTO DEBITO CONTA"))
    .reduce((acc, t) => acc.plus(Big(t.TRNAMT)), Big(0))
    .toFixed(2);
}

function getTransactions(ofxData) {
  return ofxData.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST
    .STMTTRN;
}

module.exports = updateValuesInDolar;

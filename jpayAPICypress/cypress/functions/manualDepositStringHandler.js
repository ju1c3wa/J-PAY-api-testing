var valid_credentials = {
    sID: "509999232",
    uID: "kazuha_1291121",
    depositAmount: "100000",
    merchantNumber: "8840451493",
    receivingCurrency: "JPY",
    transferID: "3555418",
    returnUrl: "172.68.118.38"
}

var invalid_credentials = {
    emptyUID: '',
    emptyTransferID: '',
    emptyPaymentID: '',
    emptyAmount: '',

}

module.exports = {valid_credentials, invalid_credentials};
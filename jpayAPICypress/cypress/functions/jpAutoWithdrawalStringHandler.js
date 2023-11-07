var valid_credentials = {
    merchantID: "CRA378942",
    accountID: "8840451493",
    ayakaEmailAddress: "kazuha@mailinator.com",
    withdrawalAmount: "1000",
    payloadType: "JP_WITHDRAWAL_REQUEST",
    merchantNumber: "8840451493",
    bankName: "みずほ銀行",
    bankCode: "0001",
    branchName: "函館支店",
    branchCode: "735",
    account: "1234567",
    name: "マツダヒロヒト",

    pprodMerchantID: "UQA287730",
    pprodaccountID: "6106531816",
    pprodEmailAddress: "testnijoshua@mailinator.com",
    pprodwithdrawalAmount: "1000",
    pprodpayloadType: "WITHDRAWAL_REQUEST",
    pprodmerchantNumber: "6106531816",
    pprodbankName: "みずほ銀行",
    pprodbankCode: "0001",
    pprodbranchName: "函館支店",
    pprodbranchCode: "735",
    pprodaccountNumber: "0001000",
    pprodAccount: "1234567",
    pprodName: "マツダヒロヒト",


}

var invalid_credentials = {
    notValidSignature: "09757fc63b6e3002cdecc37c3c9b5ff309039504f157735b60ff43e467c14ec",
    usedSignature: "f09757fc63b6e3002cdecc37c3c9b5ff309039504f157735b60ff43e467c14ec",
    threeDigitBankCode: "111",
    twoDigitBankCode: "22",
    diffBranchCode: "111",
    diffBankCode: "2222",
    diffBranchName: "函館",
    diffBankName: "みず",
    sixDigitAccount: "123456",
    aboveTenMillAmount: "20000000",
    lessOneThouAmount: "500",
    invalidMerchantNumber: "92919122",
    hiraganaName: "函館支店"
}


module.exports = {valid_credentials, invalid_credentials};
var valid_credentials = {
    merchantID: "CRA378942",
    accountID: "8840451493",
    ayakaEmailAddress: "aya@mailinator.com",
    kazuhaEmailAddress: "kazuha@mailinator.com",
    withdrawalAmount: "10000",
    payloadType: "WITHDRAWAL_REQUEST",
    merchantNumber: "8840451493",
    bankName: "みずほ銀行",
    bankCode: "0001",
    branchName: "函館支店",
    branchCode: "735",
    accountNumber: "1134687",
    accountHolderKatakana: "カ）グローバルフィード",
    accountHolderKanji: "カ）グローバルフィード",

}

var invalid_credentials = {
    invalidSignature: "09757fc63b6e3002cdecc37c3c9b5ff309039504f157735b60ff43e467c14ec",
    usedSignature: "f09757fc63b6e3002cdecc37c3c9b5ff309039504f157735b60ff43e467c14ec",
    threeDigitBankCode: "111",
    twoDigitBranchCode: "11",
    diffBranchCode: "111",
    diffBankCode: "2222",
    diffBranchName: "函館",
    diffBankName: "みず",
    sixDigitAccount: "123456",
    aboveFifteenMillAmount: "20000000",
    lessOneAmount: "0",
    invalidMerchantNumber: "92919122",
    hiraganaName: "函館支店",
    negativeValue: "14000000"
}


module.exports = {valid_credentials, invalid_credentials};
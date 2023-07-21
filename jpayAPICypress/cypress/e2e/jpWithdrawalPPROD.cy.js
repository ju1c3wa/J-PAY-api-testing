import 'cypress-plugin-api'
import { hash } from '../functions/sha256Generator'
import { jpay_url, jpaypprod_url } from '../functions/urls'
import { generateString } from '../functions/randomStringGenerator'
import { valid_credentials, invalid_credentials } from '../functions/jpWithdrawalStringHandler'
import { pprodAccount } from '../functions/pprodStringHolder'


var i = 0
for(i = 0; i < 50; i++){

let merchantID = pprodAccount.pprodMerchantID
let accountID = pprodAccount.pprodaccountID
let emailAddress = pprodAccount.pprodEmailAddress
let payLoadType = pprodAccount.pprodpayloadType
let merchantTransactionNumber = generateString(10)
let merchantTransactionNumber2 = generateString(11)
let sig = merchantID + merchantTransactionNumber + accountID + emailAddress + payLoadType
// let sig2 = merchantID + merchantTransactionNumber2 + accountID + emailAddress + payLoadType
let signatureSha256 = hash(sig)
// let secondSignatureSha256 = hash(sig2)
let merchantNumber = pprodAccount.pprodmerchantNumber
let bankName = pprodAccount.pprodbankName
let bankCode = pprodAccount.pprodbankCode
let branchName = pprodAccount.pprodbranchName
let branchCode = pprodAccount.pprodbranchCode
let accountNumber = pprodAccount.pprodaccountNumber
let withdrawalAmount = pprodAccount.pprodwithdrawalAmount
let accountHolderKatakana = pprodAccount.pprodaccountHolderKatakana
let accountHolderKanji = pprodAccount.pprodaccountHolderKanji
let callbackUrl = jpaypprod_url.pprodBeeceptorURL
let postWithdrawalUrl = jpaypprod_url.pprodpostWithdrawal

let threeDigitBankCode = invalid_credentials.threeDigitBankCode
let twoDigitBranchCode = invalid_credentials.twoDigitBranchCode
let sixDigitAccount = invalid_credentials.sixDigitAccount
let aboveWithdrawalAmount = invalid_credentials.aboveFifteenMillAmount
let lessOneAmount = invalid_credentials.lessOneAmount
let invalidSignature = invalid_credentials.invalidSignature
let negativeValue = invalid_credentials.negativeValue


describe('JPAY TESTING', () => {
    it("POST Withdraw", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
      }).as('details')
          cy.get('@details').its('status').should('eq', 200)
          cy.get('@details').then((response) => {
              let res = response.body
              let att1 = res.id
              cy.log(att1)
          })
          cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
          });
      })
})
}
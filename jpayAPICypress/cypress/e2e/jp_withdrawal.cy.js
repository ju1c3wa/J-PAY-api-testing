import 'cypress-plugin-api'
import { hash } from '../functions/sha256Generator'
import { jpay_url } from '../functions/urls'
import { generateString } from '../functions/randomStringGenerator'

let merchantID = "CRA378942"
let accountID = "8840451493"
let emailAddress = "kazuha@mailinator.com"
let payLoadType = "WITHDRAWAL_REQUEST"
let merchantTransactionNumber = generateString(10)
let sig = merchantID + merchantTransactionNumber + accountID + emailAddress + payLoadType
let signatureSha256= hash(sig)
let merchantNumber = "8840451493"
let bankName = "みずほ銀行"
let bankCode = "0001"
let branchName = "函館支店"
let branchCode = "735"
let accountNumber = "1134687"
let withdrawalAmount = "60000"
let accountHolderKatakana = "カ）グローバルフィード"
let accountHolderKanji = "カ）グローバルフィード"
let callbackUrl = jpay_url.beeceptorUrl
let postWithdrawalUrl = jpay_url.postWithdrawal


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

  
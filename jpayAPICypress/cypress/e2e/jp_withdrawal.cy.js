import 'cypress-plugin-api'
import { hash } from '../functions/sha256Generator'
import { jpay_url } from '../functions/urls'
import { generateString } from '../functions/randomStringGenerator'


let merchantTransactionNumber = generateString(5)
let sig = "CRA378942" + merchantTransactionNumber + "8840451493kazuha@mailinator.comWITHDRAWAL_REQUEST"
let signatureSha256= hash(sig)
let merchantNumber = "8840451493"
let bankName = "みずほ銀行"
let bankCode = "0001"
let branchName = "函館支店"
let branchCode = "735"
let accountNumber = "1134687"
let withdrawalAmount = "2000"
let accountHolderKatakana = "カ）グローバルフィード"
let accountHolderKanji = "カ）グローバルフィード"
let callbackUrl = jpay_url.beeceptorUrl
let postWithdrawalUrl = jpay_url.postWithdrawal

console.log(signatureSha256)

describe('JPAY TESTING', () => {
    it("POST Generate Transfer", () => {
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

  
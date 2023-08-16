import 'cypress-plugin-api'
import { hash } from '../functions/sha256Generator'
import { jpay_url } from '../functions/urls'
import { generateString } from '../functions/randomStringGenerator'
import { valid_credentials} from '../functions/epoStringHandler'


var i = 0
for(i = 0; i < 10; i++){

let merchantID = valid_credentials.merchantID
let accountID = valid_credentials.senderID
let emailAddress = valid_credentials.merchantEmail
let payLoadType = valid_credentials.payloadType
let wamount = valid_credentials.withAmount
let receiver = valid_credentials.merchantReceive
let sender = valid_credentials.senderID
let currency = valid_credentials.curr
let debCurr = valid_credentials.debitCurr
let transID = "JULS-APITEST"
let merchantTransactionNumber = generateString(10)
let merchantTransactionNumber2 = generateString(11)
let sig = merchantID + transID + accountID + emailAddress + payLoadType
let sig2 = merchantID + merchantTransactionNumber2 + accountID + emailAddress + payLoadType
let signatureSha256 = hash(sig)
let secondSignatureSha256 = hash(sig2)
let epowURL= "https://api-secure.epowallet.com/api/merchant/internal-transfer/withdrawal"
let msg = "wewawaea"


describe('JPAY TESTING', () => {
    it("POST Withdraw", () => {
      cy.request({
        method: 'POST',
        url: epowURL,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
            receiver_individual_account: receiver,
            merchant_account: sender,
            debit_currency: debCurr,
            currency: currency,
            transaction_id: transID,
            amount: wamount,
            note: msg,
            Signature: sig
        },
      })
      cy.log("wew")
      })
})

}
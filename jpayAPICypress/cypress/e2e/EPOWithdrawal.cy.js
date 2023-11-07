import 'cypress-plugin-api'
import { hash } from '../functions/sha256Generator'
//import { jpay_url } from '../functions/urls'
//import { generateString } from '../functions/randomStringGenerator'
import { valid_credentials} from '../functions/epoStringHandler'


var i = 0
for(i = 0; i < 1000; i++){



let receiverIndividualAccount = valid_credentials.receiverIndividualAccount
let merchantAccount = valid_credentials.merchantAccount
let debitCurrency = valid_credentials.debitCurrency
let currency = valid_credentials.currency
let transactionID = valid_credentials.transactionId
let amount = valid_credentials.amount
let note = valid_credentials.note
let mid = valid_credentials.mid
let emailAddress = valid_credentials.emailAddress
let payLoadType = valid_credentials.payloadType
let sig = mid + transactionID + merchantAccount + emailAddress + payLoadType
let signatureSha256 = hash(sig)
let epowURL= "https://api-staging.epowallet.com/api/merchant/internal-transfer/withdrawal"


describe('Internal Withdrawal', () => {
    it("should create internal withdrawal B2P", () => {
      cy.request({
        method: 'POST',
        url: epowURL,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
            receiver_individual_account: receiverIndividualAccount,
            merchant_account: merchantAccount,
            debit_currency: debitCurrency,
            currency: currency,
            transaction_id: transactionID,
            amount: amount,
            note: note,
            Signature: signatureSha256,
              },
        })
      })

})

}
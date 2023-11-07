import { date_today } from '../functions/dateGenerator';
import { generateString } from '../functions/randomStringGenerator';
import { jpay_url } from '../functions/urls';
import { valid_credentials, invalid_credentials } from '../functions/manualDepositStringHandler';

var transactions = 0
for(transactions = 0; transactions < 20; transactions++){

let dateToday = date_today();
let x = Math.floor(Math.random() * 1000);
let uid = generateString(10);
let merchantTXN = generateString(10);


describe('JPAY TESTING', () => {

      it("should manual deposit", () => {
            cy.request({
              method: 'POST',
              url: "https://jp-api.orientalwallet.com/api/v1/generate-transfer",
              headers: {
                'Content-type': 'application/json'
              },
              body:{
                sid: 'testtest',
                uid: uid + x,
                am: '10000',
                merchant_number: '1016855123',
                receiving_currency: 'JPY',
                merchant_transaction_number: merchantTXN + x,
                return_url: 'https://google.com',
                status: 'active'
              },
            // }).as('details')
            //     cy.get('@details').its('status').should('eq', 200)
            //     cy.get('@details').then((response) => {
            //         let res = response.body
            //         let att1 = res.id
            //         cy.log(att1)
            //     })
            //     cy.get('@details').then((response) => {
            //     cy.log(JSON.stringify(response.body))
                });
      })
    })
}
import 'cypress-plugin-api'
import { date_today } from '../functions/dateGenerator';
import { generateString } from '../functions/randomStringGenerator';
import { jpay_url } from '../functions/urls';

var transactions = 0
for(transactions = 0; transactions < 1 ; transactions++){
let dateToday = date_today();
let uID = "xxxx"
let depositAmount = "100000"
let transferID = "8645932"
let paymentID = generateString(15);
let siteDepositURL = jpay_url.getDeposit
let getDepositURL = siteDepositURL + dateToday + paymentID + "/" + depositAmount + "@" + uID + ";" + transferID

describe('JPAY TESTING', () => {

    it("GET Deposit", () => {
        cy.request({
          method: 'GET',
          url: getDepositURL,
          headers: {
            'Content-type': 'application/json'
          },
          body:{
            amount: depositAmount,
            uid: uID,
            transfer_id: transferID
        },
    }).as('details')
        cy.get('@details').its('status').should('eq', 200)
        cy.get('@details').then((response) => {
        cy.log(JSON.stringify(
            response.body
        ))
    });
})
})
}
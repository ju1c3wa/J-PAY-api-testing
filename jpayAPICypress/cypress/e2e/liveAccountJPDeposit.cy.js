import 'cypress-plugin-api'
import { date_today } from '../functions/dateGenerator';
import { generateString } from '../functions/randomStringGenerator';
import { jpay_url, jpaypprod_url, live_url } from '../functions/urls';
import { valid_credentials, invalid_credentials } from '../functions/manualDepositStringHandler';
import { liveAccount } from '../functions/pprodStringHolder';

var transactions = 0
for(transactions = 0; transactions < 1000 ; transactions++){

let dateToday = date_today();
let uID = liveAccount.pprodUID
let invalidUID = invalid_credentials.invalidUID
let depositAmount = liveAccount.pprodwithdrawalAmount
let transferID = liveAccount.pprodTransferID
let paymentID = generateString(15);
let paymentID2 = generateString(15);
let x = Math.floor((Math.random(1000) * 99999) + 1);
let payT = dateToday + paymentID2
let siteDepositURL = live_url.liveJPDeposit
let getDepositURL = siteDepositURL + dateToday + paymentID + "/" + x + "@" + uID + ";" + transferID

describe('JPAY TESTING', () => {

    it("should manual deposit", () => {
        cy.request({
          method: 'GET',
          url: getDepositURL ,
          headers: {
            'Content-type': 'application/json'
          },
          body:{

        },
        // }).as('details')
        //     cy.get('@details').its('status').should('eq', 200)
        //     cy.get('@details').then((response) => {
        //     cy.log(JSON.stringify(response.body))
        //     expect(response.body).to.have.property('success', true)
        });
      })
    // it("should have uid", () => {
    //   cy.request({
    //       method: 'GET',
    //       url: siteDepositURL + dateToday + paymentID2 + "/" + depositAmount + "@"+ invalidUID + ";" + transferID,
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       body:{

    //     },
    //     failOnStatusCode: false
    //     }).as('details')
    //         cy.get('@details').its('status').should('eq', 200)
    //         cy.get('@details').then((response) => {
    //         let res = response.body
    //         let att1 = res.id
    //         cy.log(att1)
    //         expect(response.body).to.have.property('success', true)
            
    //         let arraylength=response.body.data.length
    //         expect(response.body.data.length).to.be.eq(arraylength)
    //         for(let i=0;i<arraylength;i++){
    //         expect(response.body.data[i]).to.have.all.keys("exception","headers", "original")
    //         cy.log("Array " + i + "is having the expected properties")
    //         expect(response.body.data[i].original).to.have.all.keys("success","message", "error_code", "data")
    //         expect(response.body.data[i].original).to.have.property('success', false)
    //         expect(response.body.data[i].original).to.have.property('message', "An unexpected error has occurred")
    //         expect(response.body.data[i].original).to.have.property('error_code', "E-DEPOSIT-500")
    //         expect(response.body.data[i].original).to.have.property('data', "Transfer ID not found " + transferID + " UID: ")
    //         }

    //     });
    //   })

})
}
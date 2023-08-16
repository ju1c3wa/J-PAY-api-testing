import 'cypress-plugin-api'
import { date_today } from '../functions/dateGenerator';
import { generateString } from '../functions/randomStringGenerator';
import { jpay_url, jpaypprod_url } from '../functions/urls';
import { valid_credentials, invalid_credentials } from '../functions/manualDepositStringHandler';
import { pprodAccount2 } from '../functions/pprodStringHolder';

var transactions = 0
for(transactions = 0; transactions < 2000 ; transactions++){

let dateToday = date_today();
let uID = pprodAccount2.pprodUID
let invalidUID = invalid_credentials.invalidUID
let depositAmount = pprodAccount2.pprodwithdrawalAmount
let transferID = pprodAccount2.pprodTransferID
let paymentID = generateString(15);
let paymentID2 = generateString(15);
let payT = dateToday + paymentID2
let siteDepositURL = jpaypprod_url.pprodGetDeposit
let getDepositURL = siteDepositURL + dateToday + paymentID + "/" + depositAmount + "@" + uID + ";" + transferID

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
import 'cypress-plugin-api'

var transactions = 0
for(transactions = 0; transactions < 1 ; transactions++){

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + mm + dd;
let uID = "xxxx"
let depositAmount = "100000"
let transferID = "8645932"
let paymentID = generateString(15);
let siteDepositURL = "https://api-stage.orientalwallet.com/api/v1/deposit-receive?data=" 
let getDepositURL = siteDepositURL + today + paymentID + "/" + depositAmount + "@" + uID + ";" + transferID

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
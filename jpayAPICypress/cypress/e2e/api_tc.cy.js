import 'cypress-plugin-api'

var i = 0
for(i = 0; i < 99 ; i++){

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
let sID = "509999232"
let uID = "xxxx"
let merchantNumber = "8840451493"
let depositAmount = "100000"
let transferID = "8645932"
let paymentID = generateString(15);
let postTransferURL = "https://api-stage.orientalwallet.com/api/v1/generate-transfer"
let siteDepositURL = "https://api-stage.orientalwallet.com/api/v1/deposit-receive?data=" 
let getDepositURL = siteDepositURL + today + paymentID + "/" + depositAmount + "@" + uID + ";" + transferID



describe('JPAY TESTING', () => {
 it("POST Generate Transfer", () => {
  cy.request({
    method: 'POST',
    url: postTransferURL,
    headers: {
      'Content-type': 'application/json'
    },
    body:{
      sid: sID,
      uid: uID,
      merchant_number: merchantNumber
    },
  });
  cy.log(paymentID)
  })


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
    });
    })
})
}
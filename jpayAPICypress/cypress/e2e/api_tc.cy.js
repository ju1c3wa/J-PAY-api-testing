
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + mm + dd;
let sID = "509999232"
let uID = "xxxx"
let merchantNumber = "8840451493"
let depositAmount = "2000"
let transferID = "8645932"
let referenceID = "MI0000014"
let postTransferURL = "https://api-stage.orientalwallet.com/api/v1/generate-transfer"
let siteDepositURL = "https://api-stage.orientalwallet.com/api/v1/deposit-receive?data=" 
let postDepositURL = siteDepositURL + today + referenceID + "/" + depositAmount + "@" + uID + ";" + transferID



describe('template spec', () => {
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
  })


  it("GET Deposit", () => {
    cy.request({
      method: 'GET',
      url: postDepositURL,
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
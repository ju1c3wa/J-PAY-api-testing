var i = 0
for(i = 0; i < 99 ; i++){

let postTransferURL = "https://api-stage.orientalwallet.com/api/v1/generate-transfer"
let sID = "509999232"
let uID = "xxxx"
let merchantNumber = "8840451493"



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
     })
})
}
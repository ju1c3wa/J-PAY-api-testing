import 'cypress-plugin-api'
import { hash } from '../functions/sha256Generator'
import { jpay_url } from '../functions/urls'
import { generateString } from '../functions/randomStringGenerator'
import { valid_credentials, invalid_credentials } from '../functions/jpWithdrawalStringHandler'


var i = 0
for(i = 0; i < 50; i++){

let merchantID = valid_credentials.merchantID
let accountID = valid_credentials.accountID
let emailAddress = valid_credentials.kazuhaEmailAddress
let payLoadType = valid_credentials.payloadType
let merchantTransactionNumber = generateString(10)
let merchantTransactionNumber2 = generateString(11)
let sig = merchantID + merchantTransactionNumber + accountID + emailAddress + payLoadType
let sig2 = merchantID + merchantTransactionNumber2 + accountID + emailAddress + payLoadType
let signatureSha256 = hash(sig)
let secondSignatureSha256 = hash(sig2)
let merchantNumber = valid_credentials.merchantNumber
let bankName = valid_credentials.bankName
let bankCode = valid_credentials.bankCode
let branchName = valid_credentials.branchName
let branchCode = valid_credentials.branchCode
let accountNumber = valid_credentials.accountNumber
let withdrawalAmount = valid_credentials.withdrawalAmount
let accountHolderKatakana = valid_credentials.accountHolderKatakana
let accountHolderKanji = valid_credentials.accountHolderKanji
let callbackUrl = jpay_url.beeceptorUrl
let postWithdrawalUrl = jpay_url.postWithdrawal

let threeDigitBankCode = invalid_credentials.threeDigitBankCode
let twoDigitBranchCode = invalid_credentials.twoDigitBranchCode
let sixDigitAccount = invalid_credentials.sixDigitAccount
let aboveWithdrawalAmount = invalid_credentials.aboveFifteenMillAmount
let lessOneAmount = invalid_credentials.lessOneAmount
let invalidSignature = invalid_credentials.invalidSignature
let negativeValue = invalid_credentials.negativeValue


describe('JPAY TESTING', () => {
    it.only("POST Withdraw", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
      }).as('details')
          cy.get('@details').its('status').should('eq', 200)
          cy.get('@details').then((response) => {
              let res = response.body
              let att1 = res.id
              cy.log(att1)
          })
          cy.get('@details').then((response) => {
          cy.log(JSON.stringify(response.body))
          });
      })
    it("should require merchant transaction number", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          //merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)

          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          let arraylength2= response.body.data.merchant_transaction_number.length
          expect(response.body.data.merchant_transaction_number.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.merchant_transaction_number[t]).to.eql("The merchant transaction number field is required.")
          }

      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
      })
    it("should require bank name", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          //bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.bank_name.length
          expect(response.body.data.bank_name.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.bank_name[t]).to.eql("The bank name field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
      })
    it("should require bank code", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          //bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.bank_code.length
          expect(response.body.data.bank_code.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.bank_code[t]).to.eql("The bank code field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
      })
    it("should require branch name", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          //branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.branch_name.length
          expect(response.body.data.branch_name.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.branch_name[t]).to.eql("The branch name field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should require branch code", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          //branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.branch_code.length
          expect(response.body.data.branch_code.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.branch_code[t]).to.eql("The branch code field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should require account number", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          //account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.account_number.length
          expect(response.body.data.account_number.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.account_number[t]).to.eql("The account number field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should require account holder katakana", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          //account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.account_holder_katakana.length
          expect(response.body.data.account_holder_katakana.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.account_holder_katakana[t]).to.eql("The account holder katakana field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should require account holder kanji", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          //account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.account_holder_kanji.length
          expect(response.body.data.account_holder_kanji.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.account_holder_kanji[t]).to.eql("The account holder kanji field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should require withdrawal amount", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          //amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          
          let arraylength2= response.body.data.amount.length
          expect(response.body.data.amount.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.amount[t]).to.eql("The amount field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should require signature", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          //signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')

          let arraylength2= response.body.data.signature.length
          expect(response.body.data.signature.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.signature[t]).to.eql("The signature field is required.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should have 3 digits branch code", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: twoDigitBranchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          
          let arraylength2= response.body.data.branch_code.length
          expect(response.body.data.branch_code.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.branch_code[t]).to.eql("The branch code must be 3 digits.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should have 4 digits bank code", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: threeDigitBankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
   
          let arraylength2= response.body.data.bank_code.length
          expect(response.body.data.bank_code.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.bank_code[t]).to.eql("The bank code must be 4 digits.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should have 7 digits account number", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: threeDigitBankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: sixDigitAccount,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
    
          let arraylength2= response.body.data.account_number.length
          expect(response.body.data.account_number.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.account_number[t]).to.eql("The account number must be 7 digits.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should have amount not greater than 15000000", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: aboveWithdrawalAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          
          let arraylength2= response.body.data.amount.length
          expect(response.body.data.amount.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.amount[t]).to.eql("The amount may not be greater than 15000000.")
          }
      })  
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should have amount not less than 1", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: lessOneAmount,
          signature: signatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid request')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-001')
          
          let arraylength2= response.body.data.amount.length
          expect(response.body.data.amount.length).to.be.eq(arraylength2)
          for(let t=0 ;t<arraylength2; t++){
            expect(response.body.data.amount[t]).to.eql("The amount must be at least 1000.")
          }
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should have valid signature", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: withdrawalAmount,
          signature: invalidSignature,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Invalid Signature')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-003')
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
    it("should have negative value result", () => {
      cy.request({
        method: 'POST',
        url: postWithdrawalUrl,
        headers: {
          'Content-type': 'application/json'
        },
        body:{
          merchant_number: merchantNumber,
          merchant_transaction_number: merchantTransactionNumber2,
          bank_name: bankName ,
          bank_code: bankCode ,
          branch_name: branchName,
          branch_code: branchCode,
          account_number: accountNumber,
          account_holder_katakana: accountHolderKatakana,
          account_holder_kanji: accountHolderKanji,
          amount: negativeValue,
          signature: secondSignatureSha256,
          callback_url: callbackUrl ,
          status: 'active'
        },
        failOnStatusCode: false
      }).as('details')
      cy.get('@details').its('status').should('eq', 400)
      cy.get('@details').then((response) => {
          let res = response.body
          let att1 = res.id
          cy.log(att1)
          expect(response.body).to.have.property('success', false)
          expect(response.body).to.have.property('message', 'Result will generate a negative value')
          expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-005')
      })
      cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
          });
        })
})

}
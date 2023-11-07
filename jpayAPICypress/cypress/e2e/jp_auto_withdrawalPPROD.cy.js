import 'cypress-plugin-api'
import { hash } from '../functions/sha256Generator'
import { jpay_url, jpaypprod_url } from '../functions/urls'
import { generateString } from '../functions/randomStringGenerator'
import { invalid_credentials, valid_credentials } from '..//functions/jpAutoWithdrawalStringHandler'
import { deepEqual } from 'assert'


var i = 0
for(i = 0; i < 50; i++){

let merchantID = valid_credentials.pprodMerchantID
let accountID = valid_credentials.pprodaccountID
let emailAddress = valid_credentials.pprodEmailAddress
let withdrawalAmount = valid_credentials.pprodwithdrawalAmount
let payLoadType = valid_credentials.payloadType
let bankName = valid_credentials.pprodbankName
let bankCode = valid_credentials.pprodbankCode
let branchName = valid_credentials.pprodbranchName
let branchCode = valid_credentials.pprodbranchCode
let merchantNumber = valid_credentials.pprodmerchantNumber
let testAccount = valid_credentials.pprodAccount
let name = valid_credentials.pprodName
let merchantTransactionNumber = generateString(10)
let merchantTransactionNumber2 = generateString(10)
let sig = merchantID + merchantTransactionNumber + accountID + emailAddress + withdrawalAmount + payLoadType
let sig2 = merchantID + merchantTransactionNumber2 + accountID + emailAddress + withdrawalAmount + payLoadType
let signatureSha256= hash(sig)
let signatureSha2562= hash(sig2)
let notValidSignature = invalid_credentials.notValidSignature
let uniqueSignature = invalid_credentials.usedSignature
let threeDigitBankCode = invalid_credentials.threeDigitBankCode
let twoDigitBranchCode = invalid_credentials.twoDigitBranchCode
let differentBranchCode = invalid_credentials.diffBranchCode
let differentBranchName = invalid_credentials.diffBranchName
let differentBankCode = invalid_credentials.diffBankCode
let differentBankName = invalid_credentials.diffBankName
let sixDigitAccount = invalid_credentials.sixDigitAccount
let aboveTenMillAmount = invalid_credentials.aboveTenMillAmount
let lessOneThouAmount = invalid_credentials.lessOneThouAmount
let invalidMerchantNumber = invalid_credentials.invalidMerchantNumber
let callbackUrl = jpaypprod_url.pprodCallbackURL
let postJPWithdrawalUrl = jpaypprod_url.pprodAutoJPWithdrawal
let hiraganaName = invalid_credentials.hiraganaName

  describe('JPAY TESTING', () => {
                        it.only("POST JPAY Withdraw", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
                            status: 'active'
                          },
                          }).as('details')
                            cy.get('@details').its('status').should('eq', 200)
                            cy.get('@details').then((response) => {
                                let res = response.body
                                let att1 = res.id
                                cy.log(att1)
                                expect(response.body).to.have.property('success', true)
                            })
                            cy.get('@details').then((response) => {
                            cy.log(JSON.stringify(response.body))
                            });
                            cy.wait(60000)
                        })

                      it("should test with missing merchant transaction number", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                        })

                      it("should test with missing bank name", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                        })

                      it("should test with missing bank code", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                        })


                      it("should test with missing branch name", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                        })
                      it("should test with missing branch code", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                        })
                      it("should test with missing account", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            //account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                        })
                      it("should test with missing name", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            //name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                        })
                      it("should test with missing amount", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            //amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                        })
                      it("should test with missing callback url", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            //callback_url: callbackUrl ,
                            signature: signatureSha256,
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
                                //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                            })
                            cy.get('@details').then((response) => {
                            cy.log(JSON.stringify(response.body))
                            });
                        })
                      it("should test with missing signature", () => {
                        cy.request({
                          method: 'POST',
                          url: postJPWithdrawalUrl,
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
                            account: testAccount,
                            name: name,
                            amount: withdrawalAmount,
                            callback_url: callbackUrl ,
                            //signature: signatureSha256,
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
                                //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                            })
                            cy.get('@details').then((response) => {
                            cy.log(JSON.stringify(response.body))
                            });
                        })
                    it("should test bank code must be 4 digits", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
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
                          account: testAccount,
                          name: name,
                          amount: withdrawalAmount,
                          callback_url: callbackUrl ,
                          signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                      })
                    it("should test branch code must be 3 digits", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
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
                          account: testAccount,
                          name: name,
                          amount: withdrawalAmount,
                          callback_url: callbackUrl ,
                          signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                      })
                    it("should test account number must be 7 digits", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
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
                          account: sixDigitAccount,
                          name: name,
                          amount: withdrawalAmount,
                          callback_url: callbackUrl ,
                          signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                      })
                    it("should test amount should not be greater  than 15000000", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
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
                          account: testAccount,
                          name: name,
                          amount: aboveTenMillAmount,
                          callback_url: callbackUrl ,
                          signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                      })
                    it("should test less than one thousand", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
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
                          account: testAccount,
                          name: name,
                          amount: lessOneThouAmount,
                          callback_url: callbackUrl ,
                          signature: signatureSha256,
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
                              //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                          })
                          cy.get('@details').then((response) => {
                          cy.log(JSON.stringify(response.body))
                          });
                      })
                    it("should test invalid signature", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
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
                        account: testAccount,
                        name: name,
                        amount: withdrawalAmount,
                        callback_url: callbackUrl ,
                        signature: notValidSignature,
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
                            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                        })
                        cy.get('@details').then((response) => {
                        cy.log(JSON.stringify(response.body))
                        });
                      })
                    it("should test signature must be unique", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
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
                        account: testAccount,
                        name: name,
                        amount: withdrawalAmount,
                        callback_url: callbackUrl ,
                        signature: signatureSha256,
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
                            expect(response.body).to.have.property('message', 'Signature already exist, signature must be unique')
                            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-004')
                            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                        })
                        cy.get('@details').then((response) => {
                        cy.log(JSON.stringify(response.body))
                        });
                      })
                    it("should test merchant not found", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body:{
                        merchant_number: invalidMerchantNumber,
                        merchant_transaction_number: merchantTransactionNumber,
                        bank_name: bankName ,
                        bank_code: bankCode ,
                        branch_name: branchName,
                        branch_code: branchCode,
                        account: testAccount,
                        name: name,
                        amount: withdrawalAmount,
                        callback_url: callbackUrl ,
                        signature: uniqueSignature,
                        status: 'active'
                        },
                        failOnStatusCode: false
                      }).as('details')
                        cy.get('@details').its('status').should('eq', 404)
                        cy.get('@details').then((response) => {
                            let res = response.body
                            let att1 = res.id
                            cy.log(att1)
                            expect(response.body).to.have.property('success', false)
                            expect(response.body).to.have.property('message', 'Merchant not found')
                            expect(response.body).to.have.property('code', 'E-GLOBAL-002')
                            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                        })
                        cy.get('@details').then((response) => {
                        cy.log(JSON.stringify(response.body))
                        });
                      })
                    it("should test different branch name", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body:{
                        merchant_number: merchantNumber,
                        merchant_transaction_number: merchantTransactionNumber,
                        bank_name: bankName ,
                        bank_code: bankCode ,
                        branch_name: differentBranchName,
                        branch_code: branchCode,
                        account: testAccount,
                        name: name,
                        amount: withdrawalAmount,
                        callback_url: callbackUrl ,
                        signature: signatureSha2562,
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
                            expect(response.body).to.have.property('message', 'Branch Name and Branch Code do not match.')
                            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-014')
                            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                        })
                        cy.get('@details').then((response) => {
                        cy.log(JSON.stringify(response.body))
                        });
                      })
                    it("should test different branch code", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body:{
                        merchant_number: merchantNumber,
                        merchant_transaction_number: merchantTransactionNumber,
                        bank_name: bankName ,
                        bank_code: bankCode ,
                        branch_name: branchName,
                        branch_code: differentBranchCode,
                        account: testAccount,
                        name: name,
                        amount: withdrawalAmount,
                        callback_url: callbackUrl ,
                        signature: signatureSha2562,
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
                            expect(response.body).to.have.property('message', 'Branch Name and Branch Code do not match.')
                            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-014')
                            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                        })
                        cy.get('@details').then((response) => {
                        cy.log(JSON.stringify(response.body))
                        });
                      })
                    it("should test different bank name", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body:{
                        merchant_number: merchantNumber,
                        merchant_transaction_number: merchantTransactionNumber,
                        bank_name: differentBankName ,
                        bank_code: bankCode ,
                        branch_name: branchName,
                        branch_code: branchCode,
                        account: testAccount,
                        name: name,
                        amount: withdrawalAmount,
                        callback_url: callbackUrl ,
                        signature: signatureSha2562,
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
                            expect(response.body).to.have.property('message', 'Bank Name and Bank Code do not match.')
                            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-013')
                            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                        })
                        cy.get('@details').then((response) => {
                        cy.log(JSON.stringify(response.body))
                        });
                      })
                    it("should test different bank code", () => {
                      cy.request({
                        method: 'POST',
                        url: postJPWithdrawalUrl,
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body:{
                        merchant_number: merchantNumber,
                        merchant_transaction_number: merchantTransactionNumber,
                        bank_name: bankName ,
                        bank_code: differentBankCode ,
                        branch_name: branchName,
                        branch_code: branchCode,
                        account: testAccount,
                        name: name,
                        amount: withdrawalAmount,
                        callback_url: callbackUrl ,
                        signature: signatureSha2562,
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
                            expect(response.body).to.have.property('message', 'Bank Name and Bank Code do not match.')
                            expect(response.body).to.have.property('error_code', 'E-WITHDRAWAL-013')
                            //expect(response.body.data).to.have.property('merchant_transaction_number' ,'{The merchant transcation number field is required.}')
                        })
                        cy.get('@details').then((response) => {
                        cy.log(JSON.stringify(response.body))
                        });
                      })

   
})

}
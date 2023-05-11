import 'cypress-plugin-api'
import { based_url , api_pk , api_diggest} from './string_handler';
import { generateString } from './random_generator';
import { date_today } from './date_generator';

let env = based_url.dev                   //change env by based_url.{dev,stg,prd}
let pk = api_pk.dev                       //change env by pk.{dev,stg,prd}
let diggest = api_diggest.dev             //change env by diggest.{dev,stg,prd}

let paymentID = generateString(11);
let date = date_today();

describe('DEPOSIT TESTING', () => {
 it("Dixon Pay", () => {
  cy.log(env)
  cy.log(pk)
  cy.log(diggest)
  cy.log(paymentID)
  cy.log(date)
 })
})

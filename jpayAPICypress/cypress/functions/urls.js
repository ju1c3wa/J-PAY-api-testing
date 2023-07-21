var jpay_url = {
    postTransfer: "https://api-stage.orientalwallet.com/api/v1/generate-transfer",
    getDeposit:   "https://api-stage.orientalwallet.com/api/v1/deposit-receive?data=",
    postWithdrawal: "https://api-stage.orientalwallet.com/api/v1/withdrawal-receive",
    postJPWithdrawal: "https://api-stage.orientalwallet.com/api/v1/jp-withdrawal/jp-create?",
    beeceptorUrl: "https://testingjpay101.free.beeceptor.com",
    beeceptorUrlAyaka: "https://ayakajpay.free.beeceptor.com",
    }
var jpaypprod_url = {
    pprodGetDeposit: "https://api-pprod.orientalwallet.com/api/v1/deposit-receive?data=",
    pprodpostWithdrawal: "https://api-pprod.orientalwallet.com/api/v1/withdrawal-receive",
    pprodBeeceptorURL: "https://joswa.free.beeceptor.com",
    pprodLiveDataBeeceptorURL: "https://joshua619.free.beeceptor.com"
    }

module.exports = {jpay_url,jpaypprod_url}
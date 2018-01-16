//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    data: {
      row: 30,
      col: 20
    },
    onLaunch: function () {
      qcloud.setLoginUrl(config.service.loginUrl)
    }
})
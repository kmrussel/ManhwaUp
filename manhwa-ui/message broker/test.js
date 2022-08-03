const web = require('./client.js')

web.scrapeURL('https://www.tappytoon.com/en/comics/i-adopted-the-male-lead')
.then((result) => {console.log(result)
return result})
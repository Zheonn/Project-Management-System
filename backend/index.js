const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign()
    .include('./config/middlewares.js')
    .then('./config/emailConfirmation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3030, () => {
    console.log(`Example app listening on port 3030`)
  })
  

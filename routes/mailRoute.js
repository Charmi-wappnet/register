var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = require('../app');


app.get("/", (req, res, next) => {
    req.render('mail')
})

app.post('/email',(req, res, next) => {

})

module.exports = router;

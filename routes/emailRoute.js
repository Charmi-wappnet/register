var express = require('express');
var router = express.Router();
const app = express();


app.get("/email", (req, res) => {
    res.render(email);
  })

  app.post("/register", async (req, res, next) => {
    const { first_name, last_name, password, email_address, gender, image} = req.body;
    try {
      await mainMail(first_name, last_name, password, email_address, gender, image);
      
      res.send("Message Successfully Sent!");
    } catch (error) {
      res.send("Message Could not be Sent");
    }
  });

  module.exports = router;

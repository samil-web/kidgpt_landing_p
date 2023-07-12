require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const fetch = require('node-fetch');
const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(__dirname + '/public'));

// Signup Route
app.post('/signup', (req, res) => {
  const {email } = req.body;

  // Make sure fields are filled
  if (!email) {
    res.redirect('/fail.html');
    return;
  }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        
      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch(`https://us21.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}`, {
    method: 'POST',
    headers: {
      Authorization: `auth ${process.env.MAILCHIMP_API}`,
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success.html') :
      res.redirect('/fail.html'))
    .catch(err => console.log(err))
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

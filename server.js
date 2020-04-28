const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// If it's not on the same origin server, it denies access - blocks it
// Cross Origin Request
app.use(cors());

if(process.env.NODE_ENV === 'productioin') {
  app.use(express.state(path.join(__dirname, 'client/build')))

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(port, error => {
  if (error) throw error;
  console.log("server running on port" + port);
})

// Request - holds all the details and information and data
// Respond - send things back to client app
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  }

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({error: stripeErr})
    } else {
      res.status(200).send({ success: stripeRes})
    }
  })
})
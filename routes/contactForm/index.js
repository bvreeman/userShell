const router = require("express").Router();
const nodemailer = require('nodemailer')

// API Routes
let transport;

if (process.env.NODE_ENV === "production") {
  console.log('production')
  transport = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: process.env.CREDS_USER,
        pass: process.env.CREDS_PASS
      }
    })
  } else {
    console.log('development')
    let creds = require('../../config/config');
    transport = nodemailer.createTransport({
      service: "Hotmail",
      auth: {
        user: creds.USER,
        pass: creds.PASS
        }
      })
  }

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/contactForm/send', (req, res, next) => {
  const FullName = req.body.FullName
  const Email = req.body.Email
  const CustomerMessage = req.body.CustomerMessage
  const PhoneNumber = req.body.PhoneNumber
  const content = `name: ${FullName} \n phone: ${PhoneNumber} \n email: ${Email} \n message: ${CustomerMessage} `

let mail;

if (process.env.NODE_ENV === "production") {
  console.log('production')
  mail = {
    from: FullName,
    to: process.env.CREDS_OUTGOING,
    subject: 'New Message from your website contact form',
    text: content
  }
} else {
  console.log('development')
  let creds = require('../../config/config');
  mail = {
    from: FullName,
    to: creds.OUTGOING,
    subject: 'New Message from your website contact form',
    text: content
  }
}

  transport.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(express.json());

const ejs = require('ejs');
const cors = require('cors');
const path = require("path");

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    pool: true,
    host: "uk77.siteground.eu", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 465, // port for secure SMTP
    tls: {
      ciphers:'SSLv3'
    },
    auth: {
      user: process.env.A1,
      pass: process.env.A2
    }
})

transporter.verify((error) => {
  if (error) {console.log(error);}
  else {console.log("Ready to Send");}
});

app.get('/view-email-template', (req, res) => {
  res.render('email');
})

app.get('/', (req, res) => {
  res.render('email-test');
})

app.post('/test-email', (req, res) => {
  console.log(123);
  console.log('Email: ' + req.body.email);
  ejs.renderFile(path.join(__dirname, "views/email.ejs"), {}, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      console.log('No Error');
      const mailOptions = {
        from: process.env.A1, // sender address (who sends)
        to: req.body.email, // list of receivers (who receives)
        subject: `Email Newsletter Testing`, // Subject line
        text: '', // plaintext body.contact
        html: data // html body
      };
  
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
            console.log(error);
            res.json({status: 'Request Failed', emailSent: false})
          } else {
            console.log('Message sent: ' + info.response);
            res.json({ status: "Email sent", emailSent: true });
          }
      });
    }
  })
})

  app.post("/contact", (req,res)=>{
    console.log('Hello');
    ejs.renderFile(path.join(__dirname, "views/email.ejs"), {}, (err, data) => {
      console.log('Data: ' + data);
      console.log('Error: ' + err);
      if(err) {
        console.log(err);
      } else {
        console.log(data);
        const mailOptions = {
          from: process.env.A1, // sender address (who sends)
          to: process.env.A4, // list of receivers (who receives)
          subject: `${req.body.contactUsName} sent you a message from the Indige Contact Form!`, // Subject line
          text: `${req.body.message}`, // plaintext body.contact
          html: data // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
              // console.log(error);
              res.json({status: 'Request Failed', emailSent: false})
            } else {
              console.log('Message sent: ' + info.response);
              res.json({ status: "Email sent", emailSent: true });
            }
        });
      }
    })
  })

const port = process.env.PORT || 5000

app.listen(port,() =>{
console.log(`App running on port ${port}`)
})

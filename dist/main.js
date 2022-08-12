"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const ejs = require('ejs');
const cors = require('cors');
const path = require("path");
app.use(cors());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.set('view engine', 'ejs');
app.use(express_1.default.static(__dirname + '/public'));
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    pool: true,
    host: "uk53.siteground.eu",
    secureConnection: false,
    port: 465,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.A1,
        pass: process.env.A2
    }
});
transporter.verify((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready to Send");
    }
});
app.get('/view-email-template', (req, res) => {
    res.render('email');
});
app.get('/', (req, res) => {
    res.render('email-test');
});
app.post('/test-email', (req, res) => {
    console.log(123);
    console.log('Email: ' + req.body.email);
    ejs.renderFile(path.join(__dirname, "views/email.ejs"), {}, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('No Error');
            const mailOptions = {
                from: process.env.A1,
                to: req.body.email,
                subject: `Email Newsletter Testing`,
                text: '',
                html: data // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    // console.log(error);
                    res.json({ status: 'Request Failed', emailSent: false });
                }
                else {
                    console.log('Message sent: ' + info.response);
                    res.json({ status: "Email sent", emailSent: true });
                }
            });
        }
    });
});
app.post("/contact", (req, res) => {
    console.log('Hello');
    ejs.renderFile(path.join(__dirname, "views/email.ejs"), {}, (err, data) => {
        console.log('Data: ' + data);
        console.log('Error: ' + err);
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            const mailOptions = {
                from: process.env.A1,
                to: process.env.A4,
                subject: `${req.body.contactUsName} sent you a message from the Indige Contact Form!`,
                text: `${req.body.message}`,
                html: data // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    // console.log(error);
                    res.json({ status: 'Request Failed', emailSent: false });
                }
                else {
                    console.log('Message sent: ' + info.response);
                    res.json({ status: "Email sent", emailSent: true });
                }
            });
        }
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
//# sourceMappingURL=main.js.map
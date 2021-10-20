require("dotenv").config();

let api_key = process.env.mail_gun_api_key;
let domain = process.env.mail_gun_domain;

let mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

exports.mailgun = mailgun;

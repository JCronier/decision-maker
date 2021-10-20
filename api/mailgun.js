require("dotenv").config();

var api_key = process.env.mail_gun_api_key;
var domain = process.env.mail_gun_domain;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

exports.mailgun = mailgun;

// var data = {
//   from: '9/2021 Group 9 <me@samples.mailgun.org>',
//   to: '2021.sept.group9.decision.maker@gmail.com',
//   subject: 'Your poll is ready to be shared.',
//   text: 'Testing some Mailgun awesomeness!'
// };

// mailgun.messages().send(data, function(error, body) {
//   if (error) {
//     console.log(error);
//   }

//   console.log(body);
// });

var api_key = 'df579b83370f7cda788351cdc9f1cf60-2bf328a5-2ca8a348';
var domain = 'sandbox064164089a7e4a6ab7eb8f52ae951991.mailgun.org';
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

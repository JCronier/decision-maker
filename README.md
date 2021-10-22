# Spooky Decision Maker Project

Spooky Decision Maker is multi-page application designed to help you and your friends come to an agreement.

A user is able to create a poll with multiple entries, hand out links to their friends for voting, and a results link is generated that contains the results of all the submissions. Voting is calculated via the [Borda Count](https://en.wikipedia.org/wiki/Borda_count) method where users submit their first choice, second choice, and so forth in order of preference in order to generate the best compromise for all users voting in the poll. 

The server will fire an email containing the administration and submission links to the creator on creation of a new poll, and when new votes are submitted to the poll. Polls and all other pertinent information lives on an online elephantSQL server, which the server queries to. The visual design of Spooky Decision Maker was made with a mobile-first design which ensures that is reactive.

## Features

- REST compliant
- Persistent database
- Mailing to users
- Authentication checking
- A spiffy spooky style

## Final Product
!["Screenshot of mobile view"]()

!["Screenshot of desktop view"]()

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Create a .env with credentials for your database
5. Go to <http://localhost:8080/> in your browser.


## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chalk
- ejs
- mailgun-js
- morgan
- pg
- pg-native
- sass
- nodemon

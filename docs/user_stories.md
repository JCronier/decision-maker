# Decision Maker User Stories

* As a creator-user, I can go to the main page and create a poll
  * creator-user inputs title, description (optional), requirements(optional), and multiple choices for the poll
  * creator-user must enter an email
    * creator-user may also enter emails of their friends
  * creator-user receives 2 links, one admin link and the other a submission link, links are also sent through email using mailgun
    * creator-user can access the results of the poll with the admin link
    * creator-user can send the submission link to anyone
  * each time a submission is received, the creator-user is notified with an email (which includes the administrative link and a link to the results)

* As a submittee-user, I can see the choices for the poll by accessing the submission link and rank them based on my preferences

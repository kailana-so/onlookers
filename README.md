# Onlookers
## Introduction
Onlookers is a mobile-first web app for automated, time-stamped note taking. Each note also includes the exact GPS co-ordinates of the location from which it was submitted. The app then automatically creates a PDF report of the user's notes.
Once a report is initiated, logs are automatically timestamped and pushed to a database at regular intervals (in this demonstration product, 10 second intervals). The user cannot access or manipulate the log entries once they have been automatically submitted to the database. Once the note-taking session is finished, the logs are automatically compiled into a PDF in chronological order, providing a timestamped, reliable account of the event.
The app could be used for legal observing, security, logistics, and any other tasks that require time-stamped log sheets. 
## Technologies Used
* AJAX using axios
* Node.js and Express.js
* PostgreSQL
* Geolocation API
* bcrypt
* ejs
* CSS
* HTML
## Interesting Features
* notes automatically logged at regular intervals
* timestamps
* geo-location 
* logs are permanent and can't be modified
* reports are automatically compiled as a PDF
## Future Code Improvements
Features that we are planning on adding to the app in the future include:
* autocorrected text for note taking
* camera access and adding photos to reports
* reports automatically emailed to relevant parties
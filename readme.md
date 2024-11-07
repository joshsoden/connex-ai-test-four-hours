# ConnexAI Timer

The ConnexAI timer is a React/Node.js app that retrieves the server's time in epoch format, so long as the correct authorisation header exists and the server's response is validated against a JSON schema.

The appliication also renders all of the express-prometheus middleware on the page.

## Installation

As a pre-requisite, you need to have both 'node' and 'npm' installed.

To install the application, you should have two terminals open:

In terminal 1, execute the following commands:
- cd server/
- npm install 
- node server.js (alternatively, for development purposes you can use 'nodemon' instead of node)

In terminal 2, execute the following commands:
- cd client/
- npm install 
- npm start

When both the client and server are launched without error, you can visit the application by visiting http://localhost:3000
# MDLive API Pagination

Pagination is a technique frequently seen in HTTP API's to make working with large data
sets more manageable. A huge number of different styles and implementations can be
observed across the web, but all of them share common characteristics.

## Table of Contents

- [Challenge](#challenge)
- [Setup](#setup)
- [API Documentation](#api-documentation)
- [Unit Testing](#integrated-testing)
- [Technologies Used](#Technologies-Used)

## Challenge

The challenge was to build a simple HTTP API endpoint that would perform pagination and write testing scripts to automaticly test the API's performance.

The server app is built with express.js and connected to a mongoDB database. Because of the built in search and filter methods provided by Mongoose.js, the logic of the endpoint is mainly focused on creating and validating the search parameters to request only the information needed from the database. Once the documents are retrieved, a map function is used to create an array with the ids and names of the apps and then send the res.json().

## Setup

### Installation

- Make sure that you have Node.js and MongoDB installed
- Clone the repo
- Install the dependencies with: `npm install`
- Create `.env` in the root of the app and define the enviroment variables

  | Environment Variables | Description                         | Default                                  |
  | --------------------- | :---------------------------------- | :--------------------------------------- |
  | PORT                  | Port for the backend express server | 5000                                     |
  | MONGODB_URI           | URI to log into mongodb             | mongodb://localhost/mdlive-apps-api      |
  | MONGODB_URI_TEST      | URI to log into test mongodb        | mongodb://localhost/mdlive-apps-api-test |

- Seed the database by running `npm run seed` in the root directory
- Start the local server using `npm start`
- Open `http://localhost:5000/api/apps`

## Example End Points

- [`https://apps-api-test.herokuapp.com/api/apps`](https://apps-api-test.herokuapp.com/api/apps)
- [`/apps?range={"by":"id"}`](https://apps-api-test.herokuapp.com/api/apps?range={"by":"id"})
- [`/apps?range={"by":"id","start":5}`](https://apps-api-test.herokuapp.com/api/apps?range={"by":"id","start":5})
- [`/apps?range={"by":"id","start":1,"end":5}`](https://apps-api-test.herokuapp.com/api/apps?range={"by":"id","start":1,"end":5})
- [`/apps?range={"by":"name","start":"my-app-001","end":"my-app-050","max":10,"order":"asc"}`](https://apps-api-test.herokuapp.com/api/apps?range={"by":"name","start":"my-app-001","end":"my-app-050","max":10,"order":"asc"})

## Unit Testing

- The unit testing is handled with Jest.js and SuperTest.js.
- To run the Jest.js tests use `npm run test`.
- The script with connect to a test database and seed it with app data.

## Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript server environment
- [Express.js](https://expressjs.com/) - Back end web application framework for Node.js
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/) - Database
- [Mongoose.js](https://mongoosejs.com/) asynchronous MongoDB tool
- [Jest](https://jestjs.io/) - JavaScript testing framework
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP Testing

# MDLive API Pagination

Pagination is a technique frequently seen in HTTP API's to make working with large data
sets more manageable. A huge number of different styles and implementations can be
observed across the web, but all of them share common characteristics.

## Table of Contents

- [Setup](#setup)
- [API Documentation](#api-documentation)
- [Unit Testing](#integrated-testing)
- [Technologies Used](#Technologies-Used)

## setup

api root
[`https://apps-api-test.herokuapp.com/api/apps`](https://apps-api-test.herokuapp.com/api/apps)

### Installation

- Make sure that you have Node.js and MongoDB installed
- Clone the repo
- Install the dependencies with: `npm install` or `yarn install`
- Create `.env` in the root of the app and define the enviroment variables
  | Environment Variables | Description | Default |
  | --------------------- | :---------------------------------- | :--------------------------------------- |
  | PORT | Port for the backend express server | 5000 |
  | MONGODB_URI | URI to log into mongodb | mongodb://localhost/mdlive-apps-api |
  | MONGODB_URI_TEST | URI to log into test mongodb | mongodb://localhost/mdlive-apps-api-test |
- Seed the database by running `yarn seed` or `npm run seed` in the root directory
- Run the local backend server using `npm start` or `yarn start`
- Open `http://localhost:5000` and Have fun!

## API Documentation

## Unit Testing

## Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript server environment
- [Express.js](https://expressjs.com/) - Back end web application framework for Node.js
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/) - Database
- [Jest](https://jestjs.io/) - JavaScript testing framework
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP Testing

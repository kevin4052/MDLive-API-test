require('dotenv').config();
const mongoose = require('mongoose');

const connect = () => {
  const URI =
    process.env.NODE_ENV === 'test'
      ? process.env.MONGODB_URI_TEST
      : process.env.MONGODB_URI;

  return new Promise((resolve, reject) => {
    mongoose
      .connect(URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then((x) => {
        console.log(
          `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
        resolve();
      })
      .catch((err) => {
        console.error(`Error connecting to mongo: ${err}`);
        reject();
      });
  });
};

const close = () => {
  return mongoose.disconnect();
};

module.exports = { connect, close };

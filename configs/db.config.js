require('dotenv').config();
const mongoose = require('mongoose');

if (process.env.TEST === 'test') {
  const { Mockgoose } = require('mockgoose');
  const mockgoose = new Mockgoose(mongoose);

  mockgoose.prepareStorage().then(() => {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then((x) =>
        console.log(
          `Connected to Mongo! Database name: "${x.connections[0].name}"`
        )
      )
      .catch((err) => console.error(`Error connecting to mongo: ${err}`));
  });
} else {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((x) =>
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      )
    )
    .catch((err) => console.error(`Error connecting to mongo: ${err}`));
}

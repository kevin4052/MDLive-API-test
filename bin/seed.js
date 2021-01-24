require('dotenv').config();
const mongoose = require('mongoose');
const App = require('../models/App.model');
const db = require('../configs/db.config');

const createData = () => {
  const appList = [];

  for (let i = 0; i < 100; i++) {
    appList.push({ id: i, name: `my-app-${String(i).padStart(3, 0)}` });
  }

  return appList;
};

const seed = () => {
  if (process.env.NODE_ENV === 'test') {
    App.collection.drop();

    App.create(createData())
      .then((appsFromDB) => {
        // console.log(`seeded test apps: ${appsFromDB.length}`);
      })
      .catch((err) =>
        console.log(`Error seeding test database with apps: ${err}`)
      );
  } else {
    db.connect().then(() => {
      App.collection.drop();

      App.create(createData())
        .then((appsFromDB) => {
          console.log(`seeded apps: ${appsFromDB.length}`);

          setTimeout(() => {
            db.close();
          }, 2000);
        })
        .catch((err) =>
          console.log(`Error seeding database with apps: ${err}`)
        );
    });
  }
};

seed();

module.exports = { seed, createData };

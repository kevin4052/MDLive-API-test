const mongoose = require('mongoose');
const App = require('../models/App.model');
const appList = [];

for (let i = 0; i < 100; i++) {
  appList.push({ id: i, name: `my-app-${String(i).padStart(3, 0)}` });
}

console.log(appList.length);

require('../configs/db.config');

App.collection.drop();

App.create(appList)
  .then((appsFromDB) => {
    console.log(`seeded apps: ${appsFromDB.length}`);

    setTimeout(() => {
      mongoose.disconnect();
    }, 2000);
  })
  .catch((err) => console.log(`Error seeding database with apps: ${err}`));

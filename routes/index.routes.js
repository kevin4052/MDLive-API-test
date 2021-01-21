const express = require('express');
const router = express.Router();
const App = require('../models/App.model');

/* GET API root */
router.get('/', (req, res) => res.status(200).json({ message: 'API root.' }));

router.get('/apps', (req, res) => {
  let { range } = req.query || {};
  range = JSON.parse(range);

  const { by, start = 0, end, max = 50, order = 'asc' } = range || {};

  const paramBy = by === 'id' || by === 'name';

  const search = {
    by,
    start: +start,
    end: +end,
    max,
    order,
  };

  // console.log({ search }, paramBy);

  if (!paramBy) {
    res.status(400).json({
      message: `Bad input parameter. Search query must include "by: id" or "by: name"`,
    });
  } else {
    App.find({ id: { $lte: end, $gte: start } })
      .then((appsFromDB) => {
        console.log(appsFromDB.length);

        const filteredApps = appsFromDB
          .map((app) => {
            return { id: app.id, name: app.name };
          })
          .sort((a, b) => a.id - b.id);

        res.status(200).json(filteredApps);
      })
      .catch((err) => console.log(`Error searching database: ${err}`));
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const App = require('../models/App.model');

const byEnumList = ['id', 'name'];
const orderEnumList = ['asc', 'desc'];

/*======================== helper functions ========================*/

// parses req.query.range is it exists
const queryParser = (query) => (query ? JSON.parse(query) : {});

// checks if a query key is included in the enum list
const keyValidator = (key, enumList) => enumList.includes(key);

/* ==================== GET: apps API end point ==================== */
router.get('/apps', (req, res) => {
  const range = queryParser(req.query.range);
  const { by = 'id', start = 0, end = 50, max = 50, order = 'asc' } = range;

  if (!keyValidator(by, byEnumList)) {
    res.status(400).json({
      message: `Bad input parameter. Search query 'by' can only be 'id' or 'name'.`,
    });
  }

  if (!keyValidator(order, orderEnumList)) {
    res.status(400).json({
      message: `Bad input parameter. Search query 'order' can only be 'asc' or 'desc'`,
    });
  }

  const search =
    by === 'id'
      ? { id: { $gte: +start, $lte: +end } }
      : {
          name: {
            $gte: start,
            $lte:
              typeof end === 'number'
                ? `my-app-${String(end).padStart(3, 0)}`
                : end,
          },
        };

  App.find(search)
    .sort({ id: order === 'asc' ? 1 : -1 }) // use the "order" key to control sorting
    .limit(max)
    .then((appsFromDB) => {
      // clean up the docs to only return the id and name keys
      const filteredApps = appsFromDB.map((app) => ({
        id: app.id,
        name: app.name,
      }));

      res.status(200).json(filteredApps);
    })
    .catch((err) => console.log(`Error searching database: ${err}`));
});

module.exports = router;

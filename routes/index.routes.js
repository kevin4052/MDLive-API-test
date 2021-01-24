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

// checks if object has any keys
const emptyObject = (obj) => Object.keys(obj).length === 0;

/* ==================== GET: apps API end point ==================== */
router.get('/apps', (req, res) => {
  const range = queryParser(req.query.range);
  let { by, start = 0, end, max = 50, order = 'asc' } = range;

  // if the range search query exists
  // then check if it is a valid query
  if (!emptyObject(range)) {
    if (by === undefined) {
      res.status(400).json({
        message: `Search query parameter 'by' is required.`,
      });
      return;
    }

    if (!keyValidator(by, byEnumList)) {
      res.status(400).json({
        message: `Search query parameter 'by' can only be 'id' or 'name'.`,
      });
      return;
    }

    if (!keyValidator(order, orderEnumList)) {
      res.status(400).json({
        message: `Search query parameter 'order' can only be 'asc' or 'desc'.`,
      });
      return;
    }
  } else {
    by = 'id';
  }

  const search =
    by === 'id'
      ? { id: { $gte: +start, $lte: end ? +end : start + max - 1 } }
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

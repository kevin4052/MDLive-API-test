const express = require('express');
const router = express.Router();

/* GET API root */
router.get('/', (req, res) => res.status(200).json({ message: 'API root.' }));

router.get('/apps', (req, res) => {
  let { range } = req.query || {};
  range = JSON.parse(range);

  const { by, start = 0, end, max = 50, order = 'asc' } = range || {};

  const paramBy = by === 'id' || by === 'name';

  const search = {
    by,
    start,
    end,
    max,
    order,
  };

  console.log({ search }, paramBy);

  if (!paramBy) {
    res.status(400).json({
      message: `Bad input parameter. Search query must include "by: id" or "by: name"`,
    });
  } else {
    res.status(200).json(search);
  }
});

module.exports = router;

const http = require('http');

const app = require('../index');
const db = require('../configs/db.config');

let server = http.createServer(app);

db.connect().then(() => {
  server.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
  });
});

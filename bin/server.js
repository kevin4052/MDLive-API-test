const http = require('http');

let app = require('../index');

let server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

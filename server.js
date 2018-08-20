const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('./dist/webdev-project-client'));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin',
//     'http://localhost:4200');
//   res.header('Access-Control-Allow-Credentials',
//     'true');
//   res.header('Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get('/*', function (req, res) {
  res.sendFile('./dist/webdev-project-client/index.html', {'root': __dirname});
});
app.listen(process.env.PORT || 4200);

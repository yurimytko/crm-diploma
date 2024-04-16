"use strict";

var express = require('express');

var router = require('./router/userRouter');

var workerRouter = require('./router/workersRouter');

var unitRouter = require('./router/unitRouter');

var loginRouter = require('./router/loginRouter');

var adminRouter = require('./router/adminRout');

var refRouter = require('./router/refreshRouter');

var fileUpload = require('express-fileupload');

var transferRouter = require('./router/transfersRout');

var cors = require('cors');

var PORT = process.env.PORT || 8000;
var app = express();
app.use(cors());
app.use(express.json());
app.use(express["static"]("static"));
app.use(fileUpload({}));
app.use('/api/truck', router);
app.use('/api/worker', workerRouter);
app.use('/api/admin', adminRouter);
app.use('/api/ref', refRouter);
app.use('/api/unit', unitRouter);
app.use('/api/auth', loginRouter);
app.use('/api/trnsf', transferRouter);
app.listen(PORT, function () {
  return console.log('listening on port ' + PORT);
});
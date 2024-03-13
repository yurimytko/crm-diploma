"use strict";

var jwt = require('jsonwebtoken');

var verifyToken = function verifyToken(req, res, next) {
  try {
    var token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');
    var verified = jwt.verify(token, "rweqtwqfdsagqrwgfsre87423huiu2u243h932y4b38g28b");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({
      message: "Invalid Token"
    });
  }
};

module.exports = verifyToken;
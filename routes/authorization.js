const express = require('express');
const router = express.Router();
const registration = require('../apis/authorization/registration');
const login = require('../apis/authorization/login');
const {StatusCodes} = require("http-status-codes");

router.post('/register', async (req, res, next) => {
  // Todo : Validation on userName and Password
  const {password ,userName} = req.body;
  const user = await registration(userName ,password);
  res.status(StatusCodes.CREATED).json(user);
});

router.post('/login', async (req, res, next) => {
  // Todo : Validation on userName and Password
  const {password ,userName} = req.body;
  const user = await login(userName ,password);
  (user) ?
      res.status(StatusCodes.OK).json(user)
      :
      res.status(StatusCodes.UNAUTHORIZED).json({"error" : "Password or username in incorrect"});

});

module.exports = router;

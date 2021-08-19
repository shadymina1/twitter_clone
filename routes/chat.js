const express = require('express');
const router = express.Router();
const sendMessage = require('../apis/chat/sendMessage');
const getMessage = require('../apis/chat/getMessage');
const {StatusCodes} = require("http-status-codes");
const auth = require('../middleware/auth')

router.post('/message' , auth, async (req, res, next) => {
  // Todo : Validation on userName and Password
  const {receiver_id ,text} = req.body;
  const sender_id = req.tokenDecode.user_id;
  const message_data = await sendMessage(receiver_id,text,sender_id);
  res.status(StatusCodes.CREATED).json(message_data);
});

router.get('/message' , auth, async (req, res, next) => {
  // Todo : Validation on userName and Password
  const {receiver_id} = req.body;
  const sender_id = req.tokenDecode.user_id;
  const message_data = await getMessage(receiver_id,sender_id);
  res.status(StatusCodes.OK).json(message_data);
});

module.exports = router;

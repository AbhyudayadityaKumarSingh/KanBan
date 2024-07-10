const express = require('express');
const Board = require('../models/Board');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const board = new Board({ title: req.body.title, userId: req.user.userId });
  await board.save();
  res.status(201).json(board);
});

router.get('/', auth, async (req, res) => {
  const boards = await Board.find({ userId: req.user.userId });
  res.json(boards);
});

module.exports = router;

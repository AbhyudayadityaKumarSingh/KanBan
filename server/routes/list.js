const express = require('express');
const List = require('../models/List');
const Board = require('../models/Board');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/:boardId', auth, async (req, res) => {
  const list = new List({ title: req.body.title, boardId: req.params.boardId });
  await list.save();
  const board = await Board.findById(req.params.boardId);
  board.lists.push(list._id);
  await board.save();
  res.status(201).json(list);
});

router.get('/:boardId', auth, async (req, res) => {
  const lists = await List.find({ boardId: req.params.boardId });
  res.json(lists);
});

module.exports = router;

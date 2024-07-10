const express = require('express');
const Card = require('../models/Card');
const List = require('../models/List');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/:listId', auth, async (req, res) => {
  const card = new Card({ title: req.body.title, listId: req.params.listId });
  await card.save();
  const list = await List.findById(req.params.listId);
  list.cards.push(card._id);
  await list.save();
  res.status(201).json(card);
});

router.get('/:listId', auth, async (req, res) => {
  const cards = await Card.find({ listId: req.params.listId });
  res.json(cards);
});

router.post('/upload/:cardId', auth, upload.single('file'), async (req, res) => {
  const card = await Card.findById(req.params.cardId);
  card.attachments.push(req.file.path);
  await card.save();
  res.status(201).json(card);
});

module.exports = router;

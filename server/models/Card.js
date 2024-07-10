const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  attachments: [String],
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
});
module.exports = mongoose.model('Card', cardSchema);

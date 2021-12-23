const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;

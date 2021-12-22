// const router = require('express').Router();
// const Note = require('../models/notes.model');
// const User = require('../models/users.model');
// const auth = require('./auth');

// router.post('/create', auth, async (req, res) => {
//   const note = new Note({
//     content: req.body.content,
//     title: req.body.title,
//   });

//   try {
//     const newNote = await note.save();
//     res.send('Done!');
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// module.exports = router;

const router = require('express').Router();
const auth = require('../routes/auth');
const noteCtrl = require('../controllers/notesCtrl');

router.route('/').get(auth, noteCtrl.getNotes).post(auth, noteCtrl.createNote);

router
  .route('/:id')
  .get(auth, noteCtrl.getNote)
  .put(auth, noteCtrl.updateNote)
  .delete(auth, noteCtrl.deleteNote);

module.exports = router;

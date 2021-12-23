const router = require('express').Router();
const auth = require('../routes/auth');
const folderCtrl = require('../controllers/folderCtrl');

router
  .route('/')
  .get(auth, folderCtrl.getFolder)
  .post(auth, folderCtrl.createFolder);

// router
//   .route('/:id')
//   .get(auth, noteCtrl.getNote)
//   .put(auth, noteCtrl.updateNote)
//   .delete(auth, noteCtrl.deleteNote);

module.exports = router;

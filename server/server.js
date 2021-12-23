const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

require('dotenv').config();
app.use(cors());
app.use(express.json());

// ROUTES
const usersRoute = require('./routes/users');
const notesRoute = require('./routes/notes');
const foldersRoute = require('./routes/folders');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo connected successfully!');
});

app.use(express.json());

app.use('/api/users', usersRoute);
app.use('/api/notes', notesRoute);
app.use('/api/folders', foldersRoute);

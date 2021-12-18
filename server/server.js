const express = require ('express');
const app = express();
const mongoose = require('mongoose')
require ('dotenv').config()

// ROUTES
const usersRoute = require ('./routes/users')

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo connected successfully!");
})

app.use(express.json());

app.use("/api/users", usersRoute);
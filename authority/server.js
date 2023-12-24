const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

const app = express();

const MongoDBURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/authority'

mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {})


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/index');
app.use('/', routes)

app.use((req, res, next) => {
    const err = new Error('File Not Found!');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
})

app.listen(port, () => {
    console.log('Server Started At Port : ', port);
})

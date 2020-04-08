const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const users = require('./routes/users');
const auth = require('./routes/auth');
const story = require('./routes/story');
const express = require('express');
const cors = require('cors')
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/mevnAuth')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

const corsOptions = {     //  exposes these headers to client
  exposedHeaders: 'Authorization, xauthtoken',
};
app.use(cors(corsOptions));
app.use('/api/genres', genres);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/story', story);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
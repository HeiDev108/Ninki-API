require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const compression = require('compression');

const authorization = require('./controllers/authorization');
const ranking = require('./controllers/ranking');
const song = require('./controllers/song');

const app = express();

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res);
}
app.use(cors());
app.use(compression({
  filter: shouldCompress,
  level: 6,
}));

app.get('/', (req, res) => { console.log('hi') })
app.get('/authorization', () => { authorization.getSpotifyToken() })
app.get('/ranking', (req, res) => { ranking.getRanking(req, res) })
app.get('/song', (req, res) => { song.getSong(req, res) })


app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}.`)
})



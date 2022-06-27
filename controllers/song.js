const { default: axios } = require("axios");
const authorization = require('./authorization.js');

async function getSong(req, res) {
  const authResponse = await authorization.getSpotifyToken();
  const token = authResponse.data.access_token;

  const url = `https://api.spotify.com/v1/tracks/${req.headers.song}`;
  
  const reqOpt = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
    },
  };

  return axios.get(url, reqOpt)
    .then(response => res.send(response.data))
    .catch(function (error) {
      console.log(error);
      res.status(400).json('Unable to get song');
    })
};

module.exports = {
  getSong: getSong
}
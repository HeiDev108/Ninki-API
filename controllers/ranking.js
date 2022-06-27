const { default: axios } = require("axios");
const authorization = require('./authorization.js');

async function getRanking(req, res) {
  const authResponse = await authorization.getSpotifyToken();
  const token = authResponse.data.access_token;

  const japanTop50Viral = '1KR3fZBqf68SttgFz9Bs0x';
  const dailyJapanTop50Spotify = '37i9dQZEVXbKXQ4mDTEBXq';
  const weeklyJapanTop50Spotify = '37i9dQZEVXbKqiTGXuCOsB';
  let playlist = dailyJapanTop50Spotify;

  if (req.headers.chart) {
    console.log(`fetching ${req.headers.chart} chart`);
    // check headers to see which ranking we want to fetch
    switch (req.headers.chart) {
      case 'daily':
        playlist = dailyJapanTop50Spotify;
        break;
      case 'weekly':
        playlist = weeklyJapanTop50Spotify;
        break;
      case 'viral':
        playlist = japanTop50Viral;
        break;
      default:
        playlist = dailyJapanTop50Spotify;
        break;
    }
  } else {
    console.log('fetching default. No chart specified');
  }

  const chartUrl = `https://api.spotify.com/v1/playlists/${playlist}`;
  
  const reqOpt = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
    },
  };

  return axios.get(chartUrl, reqOpt)
    .then(response => res.send(response.data))
    .catch(function (error) {
      console.log(error);
      res.status(400).json('Unable to get ranking');
    })
};

module.exports = {
  getRanking: getRanking
}
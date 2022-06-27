const axios = require('axios');
const qs = require('qs');

const getSpotifyToken = () => {
  const token = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`, 'utf8').toString('base64');
  const data = qs.stringify({
    'grant_type': 'client_credentials' 
  });
  const config = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'Authorization': `Basic ${token}`, 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': '__Host-device_id=AQAZTSufnFZzSXCjX6F2r44SEwEDv-PZiYuJJcGVgIV8Wsi5GZPGMj7D2-SyGN1dBdvydYrdGpt2lCL7UA8j9oadaKF8TEJUJgY; sp_tr=false'
    },
    data : data
  };

  return axios(config, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json('Unauthorised');
    } else {
      return reply.json();
    }
  })
};

module.exports = {
  getSpotifyToken : getSpotifyToken
}

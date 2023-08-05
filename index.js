const request = require('request');

async function sendRequest(u) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'head',
      headers: {
        'User-Agent': `Redirect Tester v1`,
      },
      followRedirect: false,
      url: u,
    };

    request(options, function(error, response, body) {
      if (error) reject(error);
      resolve(response);
    });
  });
}

class Whereitgoes {
  constructor() {}

  async getredirect(url) {
    const data = [];
    let u = url;

    while (true) {
      const resp = await sendRequest(u).catch(err => console.log(err));
      data.push({
        link: u,
        status_code: resp.statusCode
      });

      if (resp.statusCode === 301 || resp.statusCode === 302) {
        u = resp.headers.location;
      } else {
        break;
      }
    }

    return data;
  }
}

module.exports = Whereitgoes;

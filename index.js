var request = require('request');
function sendRequest(u) {
  return new Promise((resolve, reject) => {
    var reqbody;
    var resp;
      let options = {
  method: 'head',
  headers: {
    'User-Agent': `Redirect Tester v1`,
  },
  followRedirect: false,
  url: u,
}
    request(
      options,
      function(error, response, body) {
        if (error) reject(error);
        resp = response;
        resolve(resp);
      }
    );
  });
}
module.exports = class Whereitgoes {
  constructor() {}

  
  async getredirect(url) {
let u = url;
  let data = [];
  while (1==1){
  const resp = await sendRequest(u).catch(err => console.log(err));
  if (resp.statusCode === 301 || resp.statusCode === 302) {
          data.push({
            link: resp.headers.location,
            status_code: resp.statusCode
          });
          u = resp.headers.location;
      }
      else{
        data.push(
          {
            link: data.slice(-1)[0].link,
            status_code: resp.statusCode
          });

        return data;
       

         
        
        // return "update";

      }
    }
}
  }
  
  


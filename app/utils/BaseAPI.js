import request from 'superagent';


export default {
  getData(url, params){
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .query(params)
        .end((err, response) => {
          if (err) reject(err);
          resolve(response.body);
        });
    });
  },
  
  postData(url, params) {
    return new Promise((resolve, reject) => {
        request
        .post(url)
        .send(params)
        .end((err, response) => {
            if (err) reject(err);
            resolve(response.body);
        });
    });
  },
}

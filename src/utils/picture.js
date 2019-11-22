import request from 'request';

const catteGettingUrl = 'https://api.thecatapi.com/v1/images/search';
const apiKey = 'bcf34e0b-3f3c-4ee6-8e3b-12aab033c63a';

export const getCattyPic = (callback, preCall) => {
  if (preCall) {
    preCall();
  }
  request(
    {
      url: catteGettingUrl,
      headers: {
        'x-api-key': apiKey,
      },
    },
    (error, response, body) => {
      const bodyObj = JSON.parse(body);
      const src = bodyObj[0].url;
      if (callback) {
        callback(src);
      }
    },
  );
};

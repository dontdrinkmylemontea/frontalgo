import https from 'https';
const getKey = 'Cat';
// const getKey = 'BingEverydayWallpaperPicture';

const imgGettingUrl = `https://uploadbeta.com/api/pictures/random/?key=${getKey}`;

// 获取随机图片
export const getRandomPicture = (callback, preCall) => {
  if (preCall) {
    preCall();
  }

  let counter = 0;
  const maxRetryTimes = 5;

  function httpsGet() {
    const request = https.get(imgGettingUrl, response => {
      const datas = [];
      let size = 0;
      counter += 1;
      response.on('data', d => {
        datas.push(d);
        size += d.length;
      });

      response.on('end', () => {
        const buff = Buffer.concat(datas, size);
        const pic = buff.toString('base64');
        const src = `data:image/jpeg;base64,${pic}`;
        if (callback) {
          callback(src);
        }
      });
    });

    request.on('error', e => {
      if (counter < maxRetryTimes) {
        setTimeout(() => {
          httpsGet();
        }, 300);
      }
    });
  }

  httpsGet();
};

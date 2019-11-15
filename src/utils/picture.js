import https from 'https';
// 随机图片请求地址
const imgGettingUrl =
  'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture';

// 获取随机图片
export const getRandomPicture = (callback, preCall) => {
  if (preCall) {
    preCall();
  }
  https.get(imgGettingUrl, response => {
    const datas = [];
    let size = 0;
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
};

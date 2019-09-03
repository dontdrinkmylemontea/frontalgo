import http from 'http';
import { message } from 'antd';
import config from '@/common/config';

const requestFactory = (method, path, data) =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: config.hostname,
      port: config.port,
      path,
      method,
    };
    const req = http.request(options, res => {
      let resData = '';
      res.on('data', chunk => (resData += chunk));
      res.on('end', () => {
        const resJs = JSON.parse(resData);
        if (res.statusCode !== 200) {
          reject(resJs);
          message.error(`statusCode:${res.statusCode}`);
          console.log('出现错误了！', res);
        }
        if (resJs.errorcode !== 0) {
          message.error(`${resJs.errorcode}: ${resJs.message}`);
          reject(resJs);
        } else {
          resolve(resJs);
        }
      });
    });
    if (data) {
      req.write(JSON.stringify(data || ''));
    }
    req.end();
  });

export const post = (path, data) => requestFactory('POST', path, data);

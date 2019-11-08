import config from '@/common/config';

export const formatTime = (date, signal) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (signal) {
    return [year, month, day].map(formatNumber).join('/');
  }

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

export const setCookie = (cname, cvalue) => {
  const exdays = 10;
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const getCookie = cname => {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const checkAuth = (username, password) => {
  if (username === config.username && password === config.password) {
    return true;
  }
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

// 生成随机数
export const getRandomNumber = (max = 1000, min = 0) =>
  Number(min + (Math.random() * (max - min)).toFixed());

// 生成无序队列
export const arrayGenerator = (arrLength = 10, largest = 1000, minimam = 0) =>
  new Array(arrLength).map(() => getRandomNumber(largest, minimam));

// 插入法生成有序队列
export const sortedArrayGenerator = (arrLength = 10) => {
  const arr = new Array(arrLength);
  let counter = 0;
  for (let i = 0; i < arrLength; i++) {
    const newNumber = getRandomNumber(10000);
    for (let j = 0; j <= counter; j++) {
      if (!arr[j]) {
        arr[j] = newNumber;
        counter++;
        break;
      }
      if (arr[j] <= newNumber) continue;
      for (let k = counter; k > j; k--) {
        arr[k] = arr[k - 1];
      }
      arr[j] = newNumber;
      counter++;
      break;
    }
  }
  return arr;
};

export const easySorted = (arrLength = 10) => {
  const arr = new Array(arrLength);
  for (let i = 0; i < arrLength; i++) {
    if (i === 0) {
      arr[i] = 0;
      continue;
    }
    arr[i] = arr[i - 1] + 2;
  }
  return arr;
};

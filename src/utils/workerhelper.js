export const generateWebWorker = algoFunc => {
  const blob = new Blob([`(${algoFunc.toString()})()`]);
  const url = window.URL.createObjectURL(blob);
  const worker = new Worker(url);
  return worker;
};

export const arrayGeneratorWorder = (arrLength = 10, startCall, endCall) => {
  if (startCall) {
    startCall();
  }
  const generateArray = () => {
    self.onmessage = ({ data }) => {
      const arr = new Array(data);
      for (let i = 0; i < data; i++) {
        if (i === 0) {
          arr[i] = 0;
          continue;
        }
        arr[i] = arr[i - 1] + 2;
      }
      self.postMessage(arr);
    };
  };
  const worker = generateWebWorker(generateArray);
  worker.postMessage(arrLength);
  worker.onmessage = ({ data }) => {
    if (endCall) {
      endCall(data);
    }
    worker.terminate();
  };
};

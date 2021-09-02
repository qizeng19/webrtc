import { StorageUtil } from '../storage';

export function exchangeResponse(data: any, url: string) {
  const SOURCE = localStorage.getItem('source');
  if (!SOURCE) return data;
  console.log(data);
  switch (url) {
    case '':
      const object1 = {
        auditStatus: 'status'
      };
      return handleData(data, url, object1);
      break;
    default:
      return data;
  }
}

function handleData(data: any, url: string, object?: any) {
  if (Array.isArray(data)) {
    const arrayData: any[] = [];
    data.forEach(item => {
      arrayData.push(exchangeResponse(item, url));
    });
    return arrayData;
  }

  return exchangeNewxxResponse(data, url, object);
}
function exchangeNewxxResponse(data: any, url: string, object: any) {
  return exChangeFunction(object, data, url);
}

export function exChangeFunction(object: Record<string, any>, data: any, url: string) {
  const newData = {};
  Object.keys(object).forEach((key: string) => {
    let arrayData = data[key];

    if (Array.isArray(data[key])) {
      arrayData = [];
      data.forEach((item: any) => {
        arrayData.push(exchangeResponse(item, url));
      });
      return arrayData;
    }

    newData[object[key]] = arrayData;
    console.log(arrayData, object[key]);
  });
  console.log('arrayData', { ...newData });

  return { ...newData, ...data };
}

export const errorType = {
  CONNECTION:'CONNECTION'
}

export const errorHandler = (error,key) => {
  switch (key) {
    case errorType.CONNECTION:
      return 'connection error';  
    default:
      console.log('unknow error',error);
      return 'unknow error';
  }
}
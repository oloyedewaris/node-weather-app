var asyncAdd= (a, b)=> {
  return new Promise ((resolve, reject)=> {
    if (typeof a === 'number' && typeof b === 'number') {
      resolve(a+b);
    } else {
      reject('The input should be a number');
    }
  });
}
asyncAdd(5, '7').then((result)=> {
  console.log(result);
  return asyncAdd(result, 12);
}).then((result)=> {
  console.log('total result should be 24', result);
}).catch((errorMessage)=>{
  console.log('An error occured', errorMessage);
})

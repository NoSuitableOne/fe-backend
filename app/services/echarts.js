exports.generate = (id) => {
  return new Promise((resolve) => {
    let timeOut = Math.random() * 3;
    console.log('set timeout to: ' + timeOut + ' seconds.');
    setTimeout(() => {
        if (timeOut < 1) {
          resolve({
            status: 1
          });
        }
        else {
          resolve({
            status: -1
          })
        }
    }, timeOut * 1000);
  });
}
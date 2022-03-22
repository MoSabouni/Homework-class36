'use strict';

const getAnonName = (firstName) => {
  return new Promise((resolve, reject) => {
    if (!firstName) {
      reject(Error("You didn't pass in a first name!"));
    }

    resolve(`${firstName} Doe`);
  });
};

function main() {
  getAnonName(`John`)
    .then((resolveValue) => console.log(resolveValue))
    .catch();
}

if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = getAnonName;

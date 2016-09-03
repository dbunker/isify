
module.exports = function (func) {
  var args = Array.prototype.slice.call(arguments, 1)
  return new Promise(function (resolve, reject) {
    args.push(function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
    func.apply(this, args)
  })
}

/*
// ES6
module.exports = (func, ...args) => {
  return new Promise((resolve, reject) => {
    func(...args, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
*/

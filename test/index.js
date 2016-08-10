
const isify = require('../source')

const simpleTest = () => {
  const toTest = (firstParam, secondParam, callback) => {
    callback(null, `Processed ${firstParam} and ${secondParam}`)
  }

  return isify(toTest, 'firstParamForTest', 'secondParamForTest')
    .then(result => {
      assert(result === 'Processed firstParamForTest and secondParamForTest',
        'Did not get correct result')
    })
}
simpleTest.info = 'simpleTest: must have valid single result'

const errorTest = () => {
  const toTest = callback => {
    callback('Could not process')
  }

  return isify(toTest)
    .then(() => {
      assert(false, 'Did not throw correct error')
    })
    .catch(err => {
      assert(err === 'Could not process', 'Did not throw correct error')
    })
}
errorTest.info = 'errorTest: must throw error for error param of callback'

const throwErrorTest = () => {
  const toTest = () => {
    throw new Error('Could not process')
  }

  return isify(toTest, 'firstParamForTest')
    .then(() => {
      assert(false, 'Did not throw correct error')
    })
    .catch(err => {
      assert(err.message === 'Could not process', 'Did not throw correct error')
    })
}
throwErrorTest.info = 'throwErrorTest: must throw error on function thrown error'

const waitTest = () => {
  const toTest = (param, callback) => {
    setTimeout(() => {
      callback(null, param)
    }, 10)
  }

  return isify(toTest, 'firstParamForTest')
    .then(result => {
      assert(result === 'firstParamForTest', 'Incorrect param')
    })
}
waitTest.info = 'waitTest: must wait and then return'

const testList = tests => {
  return tests.reduce((returnPromise, testFunc) => {
    return returnPromise.then(params => {
      return testFunc(params)
        .catch(err => {
          consoleLog('FAILED', testFunc.info)
          throw err
        })
        .then(() => {
          consoleLog('PASSED', testFunc.info)
        })
    })
  }, Promise.resolve())
}

const assert = (statement, message) => {
  if (!statement) {
    throw new Error(message)
  }
}

const consoleLog = (...msgs) => {
  // eslint-disable-next-line no-console
  console.log(...msgs, '\n')
}

testList([
  simpleTest,
  errorTest,
  throwErrorTest,
  waitTest
])
  .then(() => {
    consoleLog('Tests Completed Successfully')
  })
  .catch(err => {
    consoleLog(err)
  })

function sum(a, b) {
    return a + b;
}


const fetch = require('node-fetch');
const userCtrl = require('../controllers/user.controller')

test('adds 1 + 2 to equal 3', () => {
  // fetch('http://localhost:5000/api/users')
  //   .then(res => res.text())
  //   .then(text => console.log(text))
  expect(sum(1, 2)).toBe(3);
})
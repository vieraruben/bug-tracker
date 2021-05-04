const axios = require('axios')

const config = {
  headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg4OTVhMjNhMjkyYjNiNjAxOGVhZTQiLCJpYXQiOjE2MTk1NjQyODB9.ps4CtN_BTuT-MeG0c7mKmU9vdcIs2sNj0TvSqwT9Zek` }
};

let newUserCreatedId = ""


test('user Test request', async () => {
  const response = await axios.get('http://localhost:5000/api/users/test')
  let data = response.data
  expect(data.message).toBe("Testing User Ruben");
})


test('get User by ID', async () => {

  const response = await axios.get('http://localhost:5000/api/users', config)
  let data = response.data

  expect(data[0].name + '-' + data[0].email).toBe("Ruben-v@g.com")

})

test('create new Test User', async () => {

  const bodyParameters = {
    "name": "JoeEmployeeTestUser",
    "email": "JoeEmployeeTestUser@g.com",
    "password": "JoeEmployeeTestUser"
  }

  const response = await axios.post(
    'http://localhost:5000/api/users',
    bodyParameters,
    config
  )

  let data = response.data

  newUserCreatedId = data.user._id

  expect(data.user.name).toBe("JoeEmployeeTestUser")

})

test('delete new Test User created', async () => {

  const response = await axios.delete(
    `http://localhost:5000/api/users/${newUserCreatedId}`,
    config
  )

  let data = response.data

  expect(data._id).toBe(newUserCreatedId)

})
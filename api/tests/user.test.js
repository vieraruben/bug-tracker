const axios = require('axios')

test('adds 1 + 2 to equal 3', async () => {
  const response = await axios.get('http://localhost:5000/api/users')
  let data = response.data
  expect(data.message).toBe("Testing User Ruben");
})
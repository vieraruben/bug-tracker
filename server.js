
const config = require('./config/config')
const mongoose = require('mongoose')
const app = require('./express')

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})
  .catch(err => console.log(err))

app.listen(config.port, (err) => {
  if (err) console.log(err)
  console.info('Server started on port %s.', config.port)
})
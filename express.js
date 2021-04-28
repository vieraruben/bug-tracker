const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const fileUpload = require('express-fileupload');

const userRoutes = require('./api/routes/user.routes')
const projectRoutes = require('./api/routes/project.routes')
const ticketRoutes = require('./api/routes/ticket.routes')
const authRoutes = require('./api/routes/auth.routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// enable files upload
app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 1 * 1024 * 1024 * 1024 //1MB max file(s) size
},
}));

app.use(express.static('attachments'));

// mount routes
app.use('/', userRoutes)
app.use('/', projectRoutes)
app.use('/', ticketRoutes)
app.use('/', authRoutes)


// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
})

module.exports = app
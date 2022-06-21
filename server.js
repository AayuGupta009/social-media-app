/* eslint-disable no-console */
require('app-module-path').addPath(`${__dirname}/`)
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const http = require('http')
const morgan = require('morgan')
const { host, httpPort, apiGatewayServiceUrl } = require('./config')
const { connections } = require('./config/database')
// const routes = require('./app/routes');
const { errorHandler } = require('middlewares')
const errors = require('errors')
const path = require('path')
const cors = require('cors')
const xmlparser = require('express-xml-bodyparser')

const app = express()

app.use(cors())
app.use(xmlparser({ trim: false, explicitArray: false }))
app.use(morgan('dev'))
app.use((req, res, next) => {
   const origin =
      req.headers['origin'] || req.headers['Origin'] /* eslint-disable-line */
   if (origin && origin === apiGatewayServiceUrl) {
      axios.defaults.headers.origin = origin
      return next()
   }
   return next(errors.notAllowedCorsError)
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(__dirname))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/health', (req, res) => res.send('ok'))
app.get('/apple-app-site-association', (req, res) => {
   res.setHeader(
      'Content-Disposition',
      'inline;filename="apple-app-site-association"'
   )
   res.setHeader('Content-Type', 'application/json')
   res.sendFile(`${__dirname}/apple-app-site-association`)
})

const httpServer = http
   .createServer(app.handle.bind(app))
   .listen(httpPort, () => {
      console.info(`Server up successfully - host: ${host} port: ${httpPort}`)
   })

// API routes
const routes = require('./app/routes')
app.use(routes)

// Error Middlewares
app.use(errorHandler.methodNotAllowed)
app.use(errorHandler.genericErrorHandler)

process.on('unhandledRejection', (err) => {
   console.error('possibly unhandled rejection happened')
   console.error(err.message)
   // enabledStackTrace && console.error(`stack: ${err.stack}`);
})

const closeHandler = () => {
   Object.values(connections).forEach((connection) => connection.close())
   httpServer.close(() => {
      console.info('Server is stopped succesfully')
      process.exit(0) /* eslint-disable-line */
   })
}

process.on('SIGTERM', closeHandler)
process.on('SIGINT', closeHandler)

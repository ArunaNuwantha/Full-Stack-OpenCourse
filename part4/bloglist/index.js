const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const { errorHandler } = require('./utils/middleware')
const blogRouter = require('./controllers/blogRouter')


const mongoUrl = config.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose
    .connect(mongoUrl)
    .then(() => {
        logger.info("SERVER: connected to MongDB...")
    })
    .catch(err => logger.error(err))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use(errorHandler)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})
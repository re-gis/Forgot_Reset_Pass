const express = require('express')
const app = express()
require('dotenv').config()
const { connectDB } = require('./config/db')
const router = require('./routes/user.routes')
const reset = require('./routes/pass.reset')

const PORT = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Database stuff
connectDB()

app.use('/api/users', router)
app.use('/api/reset', reset)



app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}...`);
})
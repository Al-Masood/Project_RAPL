require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/routes')

const app = express()
const DB_URL=process.env.DB_URL

app.use(cors());
app.use(express.json())

app.use('/api/', routes)

mongoose.connect(DB_URL, { 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})
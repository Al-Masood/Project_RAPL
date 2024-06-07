require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/routes')

const app = express()

app.use(cors());
app.use(express.json())

app.use('/api/', routes)

mongoose.connect('mongodb://127.0.0.1:27017/rapl', { 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})
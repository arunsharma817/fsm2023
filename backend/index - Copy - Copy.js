const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// Available Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/admins', require('./routes/admins'))
app.use('/api/clients', require('./routes/clients'))
app.use('/api/consultants', require('./routes/consultants'))
app.use('/api/inspectors', require('./routes/inspectors'))
app.use('/api/products', require('./routes/products'))
app.use('/api/inspections', require('./routes/inspections'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`FSM Backend listening at port http://localhost:${port}`)
})




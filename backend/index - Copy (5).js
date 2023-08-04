const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// Available Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/clients', require('./routes/clients'))
app.use('/api/consultants', require('./routes/consultants'))
app.use('/api/owners', require('./routes/owners'))
app.use('/api/inspectors', require('./routes/inspectors'))
app.use('/api/products', require('./routes/products'))
app.use('/api/inspections', require('./routes/inspections'))
app.use('/api/users', require('./routes/users'))
app.use('/api/usertype', require('./routes/usertype'))
app.use('/api/candidates', require('./routes/candidates'))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`FSM Backend listening at port http://localhost:${port}`)
})




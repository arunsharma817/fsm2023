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
app.use('/api/employees', require('./routes/employees'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/helpdesk', require('./routes/helpdesk'))
app.use('/api/inventory', require('./routes/inventory'))
app.use('/api/servicevendor', require('./routes/servicevendor'))
app.use('/api/mainproducts', require('./routes/mainProducts'))
app.use('/api/enquiry', require('./routes/enquiry'))
app.use('/api/articles', require('./routes/articles'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/reviews', require('./routes/reviews'))
app.use('/api/societymembers', require('./routes/societyMembers'))
app.use('/api/gautramembers', require('./routes/GautraMembers'))
app.use('/api/securitymembers', require('./routes/SecurityMembers'))
app.use('/api/familymembers', require('./routes/FamilyMembers'))
app.use('/api/sociallinks', require('./routes/SocialLinks.route'))
app.use('/api/buildingmembers', require('./routes/BuildingMembers'))
app.use('/api/samajmembers', require('./routes/SamajMembers'))
app.use('/api/manufacturers', require('./routes/Manufacturers'))
app.use('/api/customers', require('./routes/Customers'))
app.use('/api/pratyashis', require('./routes/Pratyashis'))
app.use('/api/companys', require('./routes/Companys'))
app.use('/api/contractors', require('./routes/Contractors'))
app.use('/api/events', require('./routes/Events'))
app.use('/api/students', require('./routes/Students'))
app.use('/api/tailors', require('./routes/Tailors'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`FSM Backend listening at port http://localhost:${port}`)
})




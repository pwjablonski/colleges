const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var request = require('request');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"
const BASE_QUERY = "?school.state=NY&latest.academics.program.bachelors.education=1&_fields=id,school.state,school.name,latest.admissions.admission_rate.overall,latest.student.size&api_key=XMWGLsXeRZ1kIFMWAEyuyBjkalMQ1s6KfvUDsLb5"

app.get('/colleges', ({query}, res) => {
  const {page} = query
  const URL = BASE_URL + BASE_QUERY +`&page=${page}`
  request(URL, {json: true }, (err, response) => {
    if (err) { 
      res.send({errors: [{error: err}]}) 
    }
    res.send(response.body)
  });
  
})

app.listen(process.env.PORT || 8081)
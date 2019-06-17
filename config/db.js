'use strict'
const mongoose= require('mongoose')

const conection= mongoose.connect("mongodb://localhost/crud-database",{ useNewUrlParser: true })
    .then(req=> console.log("db connected"))
    .catch(err=> console.log(`error in conection database ${err}`)
    )


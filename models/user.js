'use strict'
const mongoose= require('mongoose')
const bcrypt= require('bcrypt')

const userSchema=mongoose.Schema({
    nombre: String,
    email: String,
    password: String
})

userSchema.pre('save', function(next){
     bcrypt.hash(this.password, 10, (err,hash)=>{
        if(!err){
            this.password=hash
        }
        next()
    })
})

module.exports=mongoose.model('User',userSchema)

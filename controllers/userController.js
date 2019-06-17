'use strict'
const User= require('../models/user')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')
const secret="amo la vida loca"

//authenticate of user
async function authenticate(req,res){
    const userInfo= await User.findOne({email:req.body.email})
    
    if(userInfo) {
        const resul= await bcrypt.compare(req.body.password, userInfo.password)
        if (resul) {
            const token = jwt.sign({id: userInfo._id}, secret, { expiresIn: '1h' });
            res.json({status:"Ok", message: "El usuario ha sido autenticado!!!", data:{user: userInfo, token:token}}); 
        }else{
            res.json({status:"error", message: "Invalid password!!", data:null});
        }   
    }else{
        res.json({status:"error", message: "Invalid email!!", data:null});
    }
    
}

//return all users on database
async function getAllUsers (req,res) {
    const users =await User.find()
    if (!users) {
        return res.status(500).json({msg: "Error en consulta"})
    }else if(users==""){
        return res.status(200).json({msg: "No hay registros"})
    }

    return res.status(200).send(users)

}

//return a user
async function getUser (req,res) {
    if (!req.params.id) {
        return res.status(500).json({msg: "Error en parametros"})
    }

    const user = await User.findById(req.params.id, (err,user)=>{
        if (err) {
            return res.status(500).json({msg: `Error en consulta: ${err}`})
        }
        return res.status(200).send(user)
    })


}

//save a user in database
async function saveUser (req,res) {
    if (!req.body) {
        return res.status(500).json({error: "Request body emty."})
    }

    const user = new User({nombre:req.body.nombre, email:req.body.email, password:req.body.password})
    await user.save()
    return res.status(200).json({msg: "user saved."})
}


//delete a user in database
async function deleteUser(req,res){
    if (!req.params.id) {
        return res.status(500).json({error:"Params emty"})
    }

    await User.findOneAndDelete(req.params.id)
    res.status(200).json({msg: "user deleted"})
}

//update a user in database
async function updateUser(req,res){
    if (!req.params.id) {
        return res.status(500).json({error:"Params emty"})
    }
    
    await User.findOneAndUpdate(req.params.id,req.body)

    res.status(200).json({msg: "user updated"})

}

module.exports={
    getAllUsers,
    getUser,
    saveUser,
    deleteUser,
    updateUser,
    authenticate
}

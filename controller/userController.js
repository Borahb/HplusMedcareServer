const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


//@desc create user
//@route POST /hserver/users/register
//@access private

const registerUser = asyncHandler(async(req,res)=>{
    
    const {name, email, contact, password} = req.body

    if (!name || !email || !contact || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    
    const useravailable = await User.findOne({email})

    if(useravailable){
        res.status(400)
        throw new Error("User already registered")
    }
    //Hash password
    const hashedpassword = await bcrypt.hash(password,10)
    console.log("Hashed password:",hashedpassword)

    const user = await User.create({
        name,
        email,
        contact,
        password:hashedpassword
    })

    if(user){
        res.status(201)
        res.json({_id:user.id, email:user.email})
    }else{
        res.status(400)
        throw new Error("User data not valid")
    }
   
})

//@desc login user
//@route POST /hserver/users/login
//@access private

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body

    if (!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({email})

    if(!user){
        res.status(400)
        throw new Error("User not registered")
    }

    //compare password
    
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({
            user:{
                name:user.name,
                email:user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:"999999999999999999999999999999m"
        }
        )

        res.status(200).json({token})
    }else{
        res.status(401)
        throw new Error("Password not valid")
    }

})

//@desc current user
//@route GET /hserver/users/current
//@access private

const currentUser = asyncHandler(async(req,res)=>{
    console.log('authroute')
    const user = await User.findOne({_id:req.user.user.id})
    res.status(200).json(user)
    //console.log(req.user.user.id)
} )





module.exports = {registerUser, loginUser, currentUser}
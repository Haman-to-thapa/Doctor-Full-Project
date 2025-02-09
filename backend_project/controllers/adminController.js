import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'




// API for adding doctor

const addDoctor = async (req, res) => {
try {

  
  const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
  const imageFile = req.file;

// if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
//   return res.json({success: false, message : "Missing details aboout addDoctor1"})
// }

// validating email format

if (!validator.isEmail(email)) {
  return res.json({success:false, message: "Please enter a valid email"} )
}

if (password.length < 8) {
  return res.json({success:false, message: "Please enter a strong password"})
}

// hashing doctor password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // upload image to cloudinary
//   let imageUrl
//  try {
//   const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'auto'})
//     imageUrl = imageUpload.secure_url

//  } catch (error) {
//    console.log(error)
//    res.json({success: false, message:"file upload failed"})
//  }



 
const doctorData = {
  name: name,
  email,
  password: hashedPassword,
  // image:imageUrl,
  image:"image",
  speciality,
  degree,
  experience,
  about,
  fees,
  address:JSON.parse(address),
  date:Date.now(),

}
  const newDoctor = new doctorModel(doctorData)
  await newDoctor.save()

  res.json({success:true, message:"Doctor Added"})


} catch (error) {
  console.log(error)
  res.json({success:false, message:error.message})
}

}


// api or admin Login 
const loginAdmin = async ( req, res) => {
 try {
   const {email, password} = req.body;

   if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
    
    const token = jwt.sign(email+password, process.env.JWT_SECRET)
    res.json({success:true, token})

   } else {
    res.json({success:false, message:"invalid credentials"})
   }
  
 } catch (error) {
  console.log(error)
  res.json({success:false, message:error.message})
 }
}




export {addDoctor, loginAdmin}
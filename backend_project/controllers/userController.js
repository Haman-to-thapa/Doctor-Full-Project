
import validator from 'validator';  // ✅ Correct
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'



const registerUser = async (req, res) => {

  const {name, email, password} = req.body

    try {
      
      if (!name || !email || !password) {
        return res.json({success:false, message:"Missing Details"})
      }
      
    
      if (!email || !validator.isEmail(email.trim())) {
        return res.json({ success: false, message: "Invalid email" });
    }
         // ✅ Step 3: Check if email already exists
         const existingUser = await userModel.findOne({ email });
         if (existingUser) {
             return res.json({ success: false, message: "Email already registered. Please log in." });
         }
     
    
    
      if (password.length < 8) {
        return res.json({success:false, message:"Enter a 10 digit password"})
      }
    
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password,salt)
      
      console.log(password)
      const userData = {
        name,
        email,
        password:hashPassword
      }
    
      const newUser = new userModel(userData)
      const user = await newUser.save();



      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
      
      res.json({success:true, token})

    } catch (error) {
      
      console.log(error)
      res.json({success:false, message:error.message})

    }
}

// API for userlogin

  const loginUser = async (req, res) => {
    try {

      const {email, password} = req.body

    
      const user = await userModel.findOne({email})

      if(!user) {
      return res.json({ success: false, message: "user does not exist" });

      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) {
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

         res.json({success:true, token})
      } else {
       res.json({success:false, message:"invalide credentaialing"});
      }


    } catch (error) {
      console.log(error)
     res.json({success:false, message:error.messag})
    }
  }





export {registerUser, loginUser};
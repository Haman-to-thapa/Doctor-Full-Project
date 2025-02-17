
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
        //  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);


         res.json({success:true, token})
      } else {
       res.json({success:false, message:"invalide credentaialing"});
      }


    } catch (error) {
      console.log(error)
     res.json({success:false, message:error.messag})
    }
  }

  // API to get user Profile data

  const getProfile = async (req, res) => {
    try {
      // Assuming you're fetching user profile using the authenticated user ID
      if (!req.user?.id) {
        return res.status(401).json({ success: false, message: "Unauthorized. User ID not found." });
      }

      const user = await userModel.findById(req.user.id).select('-password -__v -tokens');
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, user });
  
    } catch (error) {
      console.error("🔥 Error fetching profile:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // API to update user profile
  

  // const updateProfile = async (req, res) => {
  //   try {

  //     const {user, name, phone, address, dob, gender} = req.body 
   
  //     // if (!name || !phone || !dob || !gender) {
  //     //   return res.json({success:false, message:"details missing"})
  //     // }


  //     await userModel.findByIdAndUpdate(
  //   user,
  //       {
  //         name,
  //         phone,
  //         address: JSON.parse(address),
  //         dob,
  //         gender})



  //     res.json({success:true, message:"profile update"})

  //   } catch (error) {
  //     console.log(error)
  //     res.json({success:false, messag:error.message})
  //   }
  // }


  const updateProfile = async (req, res) => {
    try {
        const {userId, name , phone , address, dob, gender} = req.body
        const imageFile = req.file
  
        if (!name || !phone || !dob || !gender) {
          return res.json({success:false, message:"Data Missing"})
        }
           
        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})
  
        if (imageFile) {
          // upload image to cloudinary
          const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
          const imageURL = imageUpload.secure_url
  
          await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }
  
        res.json({success:true, message:"profile Update"})
  
    } catch (error) {
      console.log(error)
      res.json({success:ture, message:error.message})
    }
  }



export {registerUser, loginUser, getProfile, updateProfile};
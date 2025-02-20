
import validator from 'validator';  // 
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentsModel.js';
import razorpay from 'razorpay'


const registerUser = async (req, res) => {
  const {name, email, password} = req.body
    try {
           if (!name || !email || !password) {
        return res.json({success:false, message:"Missing Details"})
      }
    
    
      if (!email || !validator.isEmail(email.trim())) {
        return res.json({ success: false, message: "Invalid email" });
    }
         //  Step 3: Check if email already exists
     
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
     res.json({success:false, message:error.messag})    }
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
      console.error(" Error fetching profile:", error);
      res.status(500).json({ success: false, message: error.message });    }
  };
  // API to update user profile
  
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
      res.json({success:false, message:error.message})
  }
  }
    
/*************  ✨ Codeium Command 🌟  *************/
    const bookAppointment = async (req, res) => {
      
      
      try {
        const { userId, docId, slotDate, slotTime } = req.body;


        const doctorData = await doctorModel.findById(docId).select('-password');
        if (!doctorData || !doctorData.available) {
          return res.json({ success: false, message: "Doctor not available" });
        }
   

        let slots_booked = doctorData.slots_booked;
        if (slots_booked[slotDate]?.includes(slotTime)) {
          return res.json({ success: false, message: "Slot not available" });
        }
  
        if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
        slots_booked[slotDate].push(slotTime);
  
         if (!userData) {
          console.error(`Request failed with status code 404: User not found: ${userId}`);
        }
  
        const appointmentData = {
          userId,
          docId,
          slotDate,
          slotTime,
          userData,
          docData: doctorData,
          amount: doctorData.fees,
          date: Date.now(),
        };
  
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
    
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
 

        res.json({ success: true, message: "Appointment booked" });
      } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
      } }


   // API to get user appointments for frontend my-appointment page

   const listAppointment = async (req, res) => {
    try {

      const {userId} = req.body

      const appointments = await appointmentModel.find({userId})

      res.json({success:true, appointments})


    } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
    }
   }
    

 // API to cancel Appointments

const cancelAppointment = async (req, res) => {
   
    try {

      const {userId, appointmentId} = req.body

      const appointmentData = await appointmentModel.findById(appointmentId)
       
      if (appointmentData.userId !== userId) {
        return res.json({success:false, message:'Unauthorized action'})
      } 

      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
      
      // releasing  doctor slot

      const {docId, slotData, slotTime} = appointmentData

      const doctorData = await doctorModel.findById(docId)

      let slots_booked = doctorData.slots_booked

      slots_booked[slotData] = slots_booked[slotData].filter(e => e !== slotTime)

      await doctorModel.findByIdAndUpdate(docId, {slots_booked})
      
    res.json({success:true, message:"Appointment cancelled"})

    } catch (error) {
      console.log(error)
      res.json({message:false, message:error.message})
    }
}

  const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
  })


//Api to make payments o appooinmnt using razorPay
const paymentRazorpay = async (req, res) => {
  try {
    const {appointmentId} = req.body

  const appointmentData = await appointmentModel.findById(appointmentId)

  if (!appointmentData || appointmentData.cancelled) {
    return res.json({success:false, message:"Appointments Cnacelled or not found"})
  }

  //  creating options for razorpay payment 
    const option = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    }

    // creation of an order

    const order = await razorpayInstance.orders.create(option)

    res.json({success:true, order})

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }

} 

// API to verify to payment of razorPay 

const varifyRazorpay = async (req, res) => {

  try {
    const {razorpay_order_id} = req.body

  const orderInfo = await razorpayInstance.orders(razorpay_order_id)
  console.log(orderInfo)

  if (orderInfo.status === 'paid') {
    await appointmentModel.findByIdAndUpdate(orderInfo)
    res.json({success:true , message:"Payment SuccessFul"})
  } else {
    res.json({success:false, message:"Payment fail"})
  }



  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, varifyRazorpay};

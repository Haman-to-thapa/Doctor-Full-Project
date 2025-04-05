import doctorModel from "../models/doctorModel.js"




const changeAvailable = async(req, res) => {

  try {
    

    const {docId} = req.body

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
    res.json({sucess:true, message: "availablity changed"})

    
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }

}

const doctorList = async (req,res) => {
  try {
    
    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({success:true, doctors})

  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
    
  }
}
  // API for doctor Login
  


export {changeAvailable, doctorList};
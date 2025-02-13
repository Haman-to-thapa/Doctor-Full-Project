// import jwt from "jsonwebtoken"

// const authAdmin = async (req, res, next) => {
//     try {

//       const {atoken} = req.headers
//       if (!atoken) {
//         return res.json({success:true, message:"Not Authorized Login Again no 1"})
//       }
//    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
    
//    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//     return res.json({success:false,message:"Not Authorized Login Again"})
//    }
//    next()

//     } catch (error) {
//       console.log(error)
//       res.json({success:false, message:"Not Authorized Login Again"})
//     }
// }



// export default authAdmin



import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check admin role or any specific claims
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    req.user = decoded; // Attach the decoded token payload to the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Middleware authentication error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authAdmin;

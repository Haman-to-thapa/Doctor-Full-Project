// import jwt from 'jsonwebtoken'

// // user authentication middleware

// const authUser = async (req, res, next) => {
//   try {
    
//     const {token} = req.body

//     if (!token) {
//       return res.json({success:false, message: "Not Authorized Login Again"})
//     }
//     const token_docode = jwt.verify(token, process.env.JWT_SECRET)

//     req.body.userId = token_docode.id

//     next()

//   } catch (error) {
//     console.log(error)
//     res.json({success:false, message:error.message})
//   }
// }

// export default authUser;


// const authUser = async (req, res, next) => {

//   // Check both "Authorization" and "atoken"
//   const authHeader = req.headers.authorization || req.headers.token;
  

//   if (!authHeader) {
//     return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
//   }

//   // Extract token from either format
//   const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
 

  

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = decoded.id
  

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied. Admins only." });
//     }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("🔥 Middleware authentication error:", error.message);
//     res.status(401).json({ success: false, message: "Invalid or expired token." });
//   }
// };
// export default authUser;

import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.token;
    
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

    req.user = decoded; // Attach user details to req
    next(); // Move to next middleware/controller

  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authUser;


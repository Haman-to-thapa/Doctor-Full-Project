


import jwt from 'jsonwebtoken';

// const authAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     console.log(authHeader)

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
//     }

//     // Extract the token from the Authorization header
//     const token = authHeader.split(" ")[1];
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check admin role or any specific claims
//     if (decoded.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied. Admins only." });
//     }

//     req.user = decoded; // Attach the decoded token payload to the request object
//     next(); // Proceed to the next middleware
//   } catch (error) {
//     console.error("Middleware authentication error:", error.message);
//     res.status(401).json({ success: false, message: "Invalid or expired token." });
//   }
// };

// export default authAdmin;




const authAdmin = async (req, res, next) => {

  // Check both "Authorization" and "atoken"
  const authHeader = req.headers.authorization || req.headers.atoken;
  

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
  }

  // Extract token from either format
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("🔥 Middleware authentication error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};
export default authAdmin;
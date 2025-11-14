import jwt from 'jsonwebtoken';

// Admin authentication middleware
const authUser = async (req, res, next) => {
    try {
      
        const token = req.headers.authorization.split(' ')[1]; // Usually "Bearer <token>"
        console.log(token);
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, please log in again" });
        }

        const token_decode = jwt.decode(token, process.env.JWT_SECRET);
    

        req.body.userId = token_decode.id;
        
        next();
    } catch (err) {
        console.log("Error in admin authentication: ", err);
        res.status(401).json({ success: false, message: err.message });
    }
}

export default authUser;

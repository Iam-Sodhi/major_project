import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ success: false, message: "Not authorized, Login again" });
        }

        const token = authHeader.split(' ')[1]; // ✅ get token string

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // decoded should match the string we signed
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not authorized, Login again" });
        }

        next();
    } catch (err) {
        console.log("error in authentication of admin : ", err);
        res.json({ success: false, message: "Not authorized, Login again" });
    }
};

export default authAdmin;

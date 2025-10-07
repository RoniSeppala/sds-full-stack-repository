import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authMiddleware = async (req, res, next) => {
    try {
        // Check for Bearer token in Authorization header, verify it, and decode token
        const auth = req.headers.authorization || ""
        if (!auth.startsWith("Bearer ")) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const token = auth.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        //check decocing, user existence and attach user to request object
        if (!decoded.user) {
            console.log("Invalid token");
            return res.status(401).json({message: "Unauthorized"})
        }
        const user = await User.findById(decoded.user._id)
        if (!user) {
            console.log("User not found");
            return res.status(401).json({message: "Unauthorized"})
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}

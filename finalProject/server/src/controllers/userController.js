import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signedToken = (user) => jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });

export const register = async (req, res, next) => {
    try {
        // extract and validate user input
        const {username, password, email} = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({message: "All fields are required"});
        }

        // check for existing user
        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if (existingUser) {
            return res.status(400).json({message: "Username or email already in use"});
        }

        // hash password and create user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username, password: hashedPassword, email});
        await newUser.save();

        console.log("User registered:", newUser.username);
        return res.status(201).json({token: signedToken(newUser)});
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        // extract and validate user input
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        // check for user and validate password
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        return res.status(200).json({token: signedToken(user)}); // Return JWT token
    } catch (error) {
        next(error);
    }
}

export const getMe = async (req, res, next) => {
    res.status(200).json(req.user);
}

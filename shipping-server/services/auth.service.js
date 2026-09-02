import User from '../models/user.model.js';
import { generateAccessToken } from '../utils/jwt.utils.js';
import ApiError from '../utils/apiError.utils.js';
import { hashPassword, comparePassword } from '../utils/password.utils.js';

export const register = async (userData) => {
    const { fullName, email, userName, password } = userData;

    if (!fullName || !email || !userName || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const [existingEmail, existingUserName] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ userName }),
    ]);

    if (existingEmail) {
        throw new ApiError(400, 'Email already exists');
    }

    if (existingUserName) {
        throw new ApiError(400, 'Username already exists');
    }


    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        fullName,
        email,
        userName,
        password: hashedPassword,
    });

    return user;
};

// user login service
export const login = async (userData) => {
    const { userName, password } = userData;

    // Find user by email
    const user = await User.findOne({ userName })

    if (!user) {
        throw new ApiError(401, "Invalid username or password.");
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password.");
    }


    //   if (!user.emailVerified) {
    //     try {
    //       await resendVerificationCode(user.email);
    //     } catch (error) {
    //       // If a code was sent within the last 60 seconds,
    //       // don't stop the login flow because of the cooldown.
    //       if (error.statusCode !== 429) {
    //         throw error;
    //       }
    //     }

    //     throw new ApiError(403, "Email verification required.");
    //   }

    // Generate access token
    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role,
    });

    await user.save();

    return {
        accessToken,
        user: {
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            role: user.role
        },
    };
};
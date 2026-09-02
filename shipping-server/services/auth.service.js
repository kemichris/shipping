import User from '../models/user.model.js';

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

    const user = await User.create({
        fullName,
        email,
        userName,
        password,
    });

    return user;
};
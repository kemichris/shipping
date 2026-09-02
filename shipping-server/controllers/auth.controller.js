import * as authServices from '../services/auth.service.js';

export const register = async (req, res, next) => {
    try {
        const user = await authServices.register(req.body);
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const loggedIn = await authServices.login(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: loggedIn,
        });
    } catch (error) {
        next(error);
    }
};
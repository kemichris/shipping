import * as adminServices from '../services/admin.service.js'

export const getDashboard = async (req, res, next) => {
    try {
        const dashboard = await adminServices.getDashboard()

        return res.status(200).json({
            success:true,
            message: 'Dashboard data retrieved',
            data: dashboard
        })
    } catch (error) {
        next(error)
    }
}
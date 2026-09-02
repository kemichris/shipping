import * as shipmentServices from '../services/shipment.service.js'

export const createShipment = async (req, res, next)=> {
    try {
        const userId = req.user._id
        const shipment = await shipmentServices.createShipment(userId, req.body)

        return res.status(201).json({
            success: true,
            message: 'Shipment created successfully',
            data: shipment
            
        })
    } catch (error) {
        next(error)
    }
}
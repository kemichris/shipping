import * as shipmentServices from '../services/shipment.service.js'

export const createShipment = async (req, res, next) => {
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

// Edit shipment 
export const updateShipment = async (req, res, next) => {
    try {
        const { id } = req.params
        const shipment = await shipmentServices.updateShipment(id, req.body)

        return res.status(200).json({
            success: true,
            message: 'Shipment updated successfully',
            data: shipment
        })
    } catch (error) {
        next(error)
    }
}

// Update location
export const updateLocation = async (req, res, next) => {
    try {
        const { id } = req.params
        const shipment = await shipmentServices.updateLocation(id, data)

        return res.status(200).json({
            success: true,
            message: 'Location updated successfully',
            data: shipment
        })

    } catch (error) {
        next(error)
    }
}
import Shipment from '../models/shipment.model.js';
import ApiError from '../utils/apiError.utils.js';
import { generateTrackingNumber } from '../utils/shipment.utils.js';

// Create shipment
export const createShipment = async (userId, shipmentData) => {
    const {
        sender,
        recipient,
        shippingMode,
        paymentMethod,
        serviceMode,
        package: packageDetails,
        estimatedDeliveryDate,
        currentLocation,
    } = shipmentData;

    if (
        !sender ||
        !recipient ||
        !shippingMode ||
        !paymentMethod ||
        !packageDetails ||
        !currentLocation
    ) {
        throw new ApiError(400, 'Required shipment information is missing');
    }

    const trackingNumber = generateTrackingNumber();

    const shipment = await Shipment.create({
        trackingNumber,

        sender,
        recipient,

        shippingMode,
        paymentMethod,
        serviceMode,

        package: packageDetails,

        status: 'pending',

        currentLocation: {
            label: currentLocation.label,
            type: 'Point',
            coordinates: currentLocation.coordinates,
            updatedAt: new Date(),
        },

        estimatedDeliveryDate,

        trackingEvents: [
            {
                status: 'pending',
                message: 'Shipment has been created',
                location: {
                    label: currentLocation.label,
                    coordinates: currentLocation.coordinates,
                },
                occurredAt: new Date(),
                updatedBy: userId,
            },
        ],
    });

    return shipment;
};

// Edit Shipment
export const updateShipment = async (userId, data) => {
    const { shipmentId, ...updates } = data;

    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
        throw new ApiError(404, 'Shipment not found');
    }

    Object.assign(shipment, updates);
    
    shipment.updatedBy = userId;

    await shipment.save();

    return shipment;
};
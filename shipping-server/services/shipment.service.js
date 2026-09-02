import Shipment from '../models/shipment.model.js';
import ApiError from '../utils/apiError.utils.js';
import { generateTrackingNumber } from '../utils/shipment.utils.js';

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
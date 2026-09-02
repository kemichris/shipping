import express from 'express'
import shipmentRoutes from './shipment.routes.js'

const router = express.Router()

router.use('/shipment', shipmentRoutes)


export default router
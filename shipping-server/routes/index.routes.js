import express from 'express'
import authRoutes from './auth.routes.js'
import shipmentRoutes from './shipment.routes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/shipment', shipmentRoutes)


export default router
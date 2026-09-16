import express from 'express'
import { protect, authorize } from '../middlewares/auth.middleware.js'
import * as adminController from '../controllers/admin.controller.js'
const router = express.Router()

router.get('/dashboard', protect, authorize('admin'), adminController.getDashboard)

export default router
import { Router } from 'express'
import { updateMe } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.put('/me', protect, asyncHandler(updateMe))

export default router

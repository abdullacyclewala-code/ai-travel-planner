import { Router } from 'express'
import {
  generateTrip,
  createTrip,
  getTrips,
  getTripById,
  deleteTrip,
} from '../controllers/tripController.js'
import { protect } from '../middleware/auth.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.use(protect)

router.post('/generate', asyncHandler(generateTrip))
router.post('/', asyncHandler(createTrip))
router.get('/', asyncHandler(getTrips))
router.get('/:id', asyncHandler(getTripById))
router.delete('/:id', asyncHandler(deleteTrip))

export default router

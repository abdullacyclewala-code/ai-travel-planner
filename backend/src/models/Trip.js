import mongoose from 'mongoose'

const daySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    activities: [{ type: String, required: true }],
  },
  { _id: false }
)

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    destination: { type: String, required: true, trim: true },
    days: { type: Number, required: true, min: 1, max: 30 },
    budget: { type: Number, required: true, min: 0 },
    itinerary: [daySchema],
  },
  { timestamps: true }
)

export default mongoose.model('Trip', tripSchema)

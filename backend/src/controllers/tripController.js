import Trip from '../models/Trip.js'
import { generateItinerary } from '../config/gemini.js'

export const generateTrip = async (req, res) => {
  const { destination, days, budget } = req.body

  if (!destination || !days || !budget) {
    return res.status(400).json({ message: 'destination, days, and budget are required' })
  }
  if (days < 1 || days > 30) {
    return res.status(400).json({ message: 'days must be between 1 and 30' })
  }

  try {
    const itinerary = await generateItinerary({ destination, days, budget })
    res.json({ itinerary })
  } catch (err) {
    res.status(502).json({ message: err.message || 'Could not generate an itinerary. Try again.' })
  }
}

export const createTrip = async (req, res) => {
  const { destination, days, budget, itinerary } = req.body

  if (!destination || !days || !budget || !Array.isArray(itinerary)) {
    return res.status(400).json({ message: 'destination, days, budget, and itinerary are required' })
  }

  const trip = await Trip.create({
    user: req.user._id,
    destination,
    days,
    budget,
    itinerary,
  })

  res.status(201).json({ trip })
}

export const getTrips = async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json({ trips })
}

export const getTripById = async (req, res) => {
  const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id })
  if (!trip) return res.status(404).json({ message: 'Trip not found' })
  res.json({ trip })
}

export const deleteTrip = async (req, res) => {
  const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id })
  if (!trip) return res.status(404).json({ message: 'Trip not found' })
  res.json({ message: 'Trip deleted' })
}

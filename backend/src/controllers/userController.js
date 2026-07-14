import User from '../models/User.js'

export const updateMe = async (req, res) => {
  const { name, email } = req.body

  if (email) {
    const existing = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.user._id } })
    if (existing) return res.status(409).json({ message: 'That email is already in use' })
  }

  if (name) req.user.name = name
  if (email) req.user.email = email
  await req.user.save()

  res.json({ user: req.user.toSafeObject() })
}

import { GoogleGenerativeAI } from '@google/generative-ai'

let client = null

const getClient = () => {
  if (!client) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set on the server')
    }
    client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }
  return client
}

// Asks Gemini for a day-by-day itinerary and returns parsed JSON:
// [{ day: 1, activities: ["...", "..."] }, ...]
export const generateItinerary = async ({ destination, days, budget }) => {
  const genAI = getClient()
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  })

  const prompt = `You are a travel planning assistant. Create a ${days}-day itinerary for a trip to ${destination} with a total budget of INR ${budget}.

Return ONLY valid JSON (no markdown, no commentary) matching exactly this shape:
{
  "itinerary": [
    { "day": 1, "activities": ["activity 1", "activity 2", "activity 3"] }
  ]
}

Rules:
- Include one object per day, for all ${days} days, "day" starting at 1.
- Each day should have 3-5 concrete, realistic activities (include approximate costs in INR where relevant, and be mindful of the total budget).
- Activities should be specific to ${destination}, not generic placeholders.
- Do not include any text outside the JSON object.`

  const result = await model.generateContent(prompt)
  const text = result.response.text()

  let parsed
  try {
    parsed = JSON.parse(text)
  } catch (err) {
    throw new Error('Failed to parse itinerary from AI response')
  }

  if (!Array.isArray(parsed.itinerary)) {
    throw new Error('AI response did not contain a valid itinerary')
  }

  return parsed.itinerary
}

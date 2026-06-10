export interface ZodiacInfo {
  name: string
  emoji: string
  element: string
  stone: string
}

export function getZodiac(dateInput: Date | string): ZodiacInfo {
  const date = new Date(dateInput)
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1 // UTC month is 0-indexed

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { name: "Aries", emoji: "♈", element: "Fire", stone: "Diamond" }
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { name: "Taurus", emoji: "♉", element: "Earth", stone: "Emerald" }
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { name: "Gemini", emoji: "♊", element: "Air", stone: "Pearl" }
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { name: "Cancer", emoji: "♋", element: "Water", stone: "Ruby" }
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { name: "Leo", emoji: "♌", element: "Fire", stone: "Peridot" }
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { name: "Virgo", emoji: "♍", element: "Earth", stone: "Sapphire" }
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { name: "Libra", emoji: "♎", element: "Air", stone: "Opal" }
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { name: "Scorpio", emoji: "♏", element: "Water", stone: "Topaz" }
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { name: "Sagittarius", emoji: "♐", element: "Fire", stone: "Tanzanite" }
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { name: "Capricorn", emoji: "♑", element: "Earth", stone: "Garnet" }
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { name: "Aquarius", emoji: "♒", element: "Air", stone: "Amethyst" }
  }
  return { name: "Pisces", emoji: "♓", element: "Water", stone: "Aquamarine" }
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getWeather(city: string = 'London') {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    )
    if (!res.ok) throw new Error('Weather fetch failed')
    return res.json()
  } catch (error) {
    console.error('Error fetching weather:', error)
    return null
  }
}


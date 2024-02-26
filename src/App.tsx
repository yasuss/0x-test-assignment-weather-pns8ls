import React, { useEffect, useState } from 'react'
import './style.css'

import { HourlyForecastCard } from './widgets/HourlyForecastCard'
import { DailyForecastCard } from './widgets/DailyForecastCard'
import {
    Location,
    Current,
    HourlyForecast,
    DailyForecast,
} from './shared/types/types'

const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY
const locationName = 'Stockholm'

export default function App() {
    const [current, setCurrent] = useState<Current | null>(null)
    const [hourlyForecast, setHourlyForecast] = useState<
        HourlyForecast[] | null
    >(null)
    const [dailyForecast, setDailyForecast] = useState<DailyForecast[] | null>(
        null
    )
    const [location, setLocation] = useState<Location | null>(null)

    // if (!hourlyForecast.length || !dailyForecast.length) {
    //     const forecast = localStorage.getItem('forecast')
    //     const daily = localStorage.getItem('daily')

    //     try {
    //         const forecastData = forecast ? JSON.parse(forecast) : null
    //         if (forecastData) setForecast(forecastData)

    //         const dailyData = daily ? JSON.parse(daily) : daily
    //         if (dailyData) setDaily(dailyData)
    //     } finally {
    //     }
    // }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude: lat, longitude: lon } = pos.coords
            setLocation({ name: 'Current Location', lat, lon })
        })
    }, [])

    useEffect(() => {
        async function getWeather() {
            const locationKey =
                location?.lat && location?.lon
                    ? `${location.lat},${location.lon}`
                    : locationName

            const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationKey}&days=10`
            const response = await fetch(apiUrl)
            const data = await response.json()

            setCurrent(data.current)
            localStorage.setItem('current', data.current)

            setLocation(data.location)
            localStorage.setItem('location', data.location)

            setDailyForecast(data.forecast.forecastday)
            localStorage.setItem('daily', data.forecast.forecastday)

            setHourlyForecast(data.forecast.forecastday[0].hour)
            localStorage.setItem('forecastday', data.forecastday)
        }

        getWeather()
    }, [location?.lat, location?.lon])

    return (
        <div>
            <div className="header">
                <div className="location">{location?.name}</div>
                <div className="temp">{current?.temp_c}°</div>
                <div className="conditions">
                    {current?.condition?.text}
                    <br />
                    H:
                    {Math.floor(
                        dailyForecast ? dailyForecast[0]?.day?.maxtemp_c : 0
                    )}
                    ° L:
                    {Math.floor(
                        dailyForecast ? dailyForecast[0]?.day?.mintemp_c : 0
                    )}
                    °
                </div>
            </div>

            {hourlyForecast ? (
                <HourlyForecastCard forecast={hourlyForecast} />
            ) : null}

            {dailyForecast ? (
                <DailyForecastCard forecast={dailyForecast} />
            ) : null}
        </div>
    )
}

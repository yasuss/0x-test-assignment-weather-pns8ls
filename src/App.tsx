import React, { useEffect, useState } from 'react'
import './style.css'

import { currentWeather, hourly, dailyForecast } from './data'
import { HourlyForecastCard } from './widgets/HourlyForecastCard'
import { DailyForecastCard } from './widgets/DailyForecastCard'

const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY
const locationName = 'Stockholm'

export default function App() {
    const [current, setCurrent] = useState(currentWeather)
    const [forecast, setForecast] = useState(hourly)
    const [daily, setDaily] = useState(dailyForecast)

    if (!forecast.length || !daily.length) {
        const forecast = localStorage.getItem('forecast')
        const daily = localStorage.getItem('daily')

        try {
            const forecastData = forecast ? JSON.parse(forecast) : null
            if (forecastData) setForecast(forecastData)

            const dailyData = daily ? JSON.parse(daily) : daily
            if (dailyData) setDaily(dailyData)
        } finally {
        }
    }

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition((pos) => {
        //     const { latitude: lat, longitude: lon } = pos.coords
        //     setCurrent({
        //         ...current,
        //         location: { name: 'Current Location', lat, lon },
        //     })
        // })
    }, [])

    useEffect(() => {
        async function getWeather() {
            const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationName}&days=10`
            const response = await fetch(apiUrl)
            const data = await response.json()

            setCurrent({
                current: data.current,
                location: data.location,
            })
            setDaily(data.forecast.forecastday)
            setForecast(data.forecast.forecastday[0].hour)
        }

        getWeather()
    }, [])

    return (
        <div>
            <div className="header">
                <div className="location">{current.location.name}</div>
                <div className="temp">{current?.current?.temp_c}</div>
                <div className="conditions">
                    {current.current.condition.text}
                    <br />
                    H:{daily[0].day.maxtemp_c} L:{daily[0].day.mintemp_c}
                </div>
            </div>

            <HourlyForecastCard forecast={forecast} />

            <DailyForecastCard daily={daily} />
        </div>
    )
}

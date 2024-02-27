import React, { useEffect, useState } from 'react'
import { HourlyForecastCard } from './widgets/hourly-forecast/HourlyForecastCard'
import { DailyForecastCard } from './widgets/daily-forecast/DailyForecastCard'
import {
    Location,
    Current,
    HourlyForecast,
    DailyForecast,
} from './shared/types'
import { getExtreme } from './shared/lib/getExtreme'
import { Loader } from './shared/ui/loader/Loader'
import { CurrentWeather } from './widgets/current-weather/CurrentWeather'
import { getCurrentLocation } from './shared/lib/getCurrentLocation'
import './style.css'

const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY
const locationName = 'Stockholm'

export default function App() {
    const [isLoading, setLoading] = useState(true)
    const [location, setLocation] = useState<Location | null>(null)
    const [data, setData] = useState<{
        current: Current | null
        hourlyForecast: HourlyForecast[] | null
        dailyForecast: {
            extreme: { min: number; max: number }
            days: DailyForecast[]
        } | null
    }>({ current: null, hourlyForecast: null, dailyForecast: null })
    const { current, hourlyForecast, dailyForecast } = data

    useEffect(() => {
        async function getData() {
            const { data, error } = await getCurrentLocation()
            if (data) setLocation(data)
            const resultLocation = error ? location : data

            const locationKey =
                resultLocation?.lat && resultLocation?.lon
                    ? `${resultLocation.lat},${resultLocation.lon}`
                    : locationName

            const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationKey}&days=10`
            const response = await (await fetch(apiUrl)).json()
            const extreme = getExtreme(response.forecast.forecastday)
            const forecast = {
                current: response.current,
                hourlyForecast: response.forecast.forecastday[0].hour,
                dailyForecast: {
                    extreme,
                    days: response.forecast.forecastday,
                },
            }

            setData(forecast)
            localStorage.setItem('forecast', JSON.stringify(forecast))

            setLocation(response.location)
            localStorage.setItem('location', response.location)
        }

        getData().finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="main">
                    <CurrentWeather
                        locationName={location?.name}
                        temp={current?.temp_c ?? 0}
                        maxTemp={dailyForecast?.days[0]?.day?.maxtemp_c ?? 0}
                        minTemp={dailyForecast?.days[0]?.day?.mintemp_c ?? 0}
                        condition={current?.condition?.text}
                    />

                    {hourlyForecast ? (
                        <HourlyForecastCard forecast={hourlyForecast} />
                    ) : null}

                    {dailyForecast ? (
                        <DailyForecastCard forecast={dailyForecast} />
                    ) : null}
                </div>
            )}
        </>
    )
}

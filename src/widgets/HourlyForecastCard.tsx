import React from 'react'
import { getIcon } from '../shared/lib/getIcon'

interface IHourlyForecastCardProps {
    forecast: {
        time: string
        temp_c: number
        condition: {
            code: number
        }
    }[]
}

const getTime = (time: string) => {
    const now = new Date()
        .toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true,
        })
        .replace(' ', '')
    const currTime = new Date(time)
        .toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true,
        })
        .replace(' ', '')

    return now === currTime ? 'Now' : currTime
}

export const HourlyForecastCard: React.FC<IHourlyForecastCardProps> = (
    props
) => {
    const { forecast } = props

    return (
        <div className="forecast">
            <div className="forecast-title">HOURLY FORECAST</div>
            <div className="scroller">
                <div className="forecast-list">
                    {forecast.map(({ time, temp_c, condition }) => (
                        <div className="forecast-item">
                            <span>{getTime(time)}</span>
                            <span>{getIcon(condition.code)}</span>
                            <span>{Math.floor(temp_c)}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

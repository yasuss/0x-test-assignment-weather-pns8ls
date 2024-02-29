import React from 'react'

interface ICurrentWeatherProps {
    locationName?: string
    temp: number
    maxTemp: number
    minTemp: number
    condition?: string
}

export const CurrentWeather: React.FC<ICurrentWeatherProps> = (props) => {
    const { locationName, temp, maxTemp, minTemp, condition } = props

    return (
        <div className="header">
            <div className="location">{locationName || 'Current location'}</div>
            <div className="temp">{temp}°</div>
            <div className="conditions">
                {condition}
                <br />
                H:
                {Math.floor(maxTemp)}° L:
                {Math.floor(minTemp)}°
            </div>
        </div>
    )
}

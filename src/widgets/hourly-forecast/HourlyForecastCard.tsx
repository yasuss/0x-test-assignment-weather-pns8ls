import React from 'react'
import { getIcon } from '../../shared/lib/getIcon'
import { getTime } from '../../shared/lib/getTime'
import './HourlyForecastCard.styles.css'

interface IHourlyForecastCardProps {
    forecast:
        | {
              time: string
              temp_c: number
              condition: {
                  code: number
              }
          }[]
        | null
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
                    {forecast &&
                        forecast.map(({ time, temp_c, condition }) => (
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

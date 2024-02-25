import React from 'react'
import { getIcon } from '../shared/lib/getIcon'

interface IDailyForecastCardProps {
    daily: {
        date: string
        day: {
            maxtemp_c: number
            mintemp_c: number
            daily_will_it_rain: number
            daily_chance_of_rain: number
            daily_will_it_snow: number
            daily_chance_of_snow: number
            condition: {
                text: string
                code: number
            }
        }
    }[]
}

const getDay = (date: string) => {
    const today = new Date()

    return today.toDateString() === new Date(date).toDateString()
        ? 'Today'
        : new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
          }).format(new Date(date))
}

export const DailyForecastCard: React.FC<IDailyForecastCardProps> = (props) => {
    const { daily } = props

    return (
        <div className="daily">
            <div className="daily-title">10-DAY FORECAST</div>
            <div className="daily-list">
                {daily.map(
                    ({
                        date,
                        day: {
                            mintemp_c: min,
                            maxtemp_c: max,
                            daily_will_it_rain,
                            daily_chance_of_rain,
                            condition,
                        },
                    }) => (
                        <div className="daily-row">
                            <div className="daily-time">{getDay(date)}</div>

                            <div className="daily-conditions">
                                {getIcon(condition.code)}
                                {daily_will_it_rain ? (
                                    <span className="probability">
                                        {daily_chance_of_rain}%
                                    </span>
                                ) : null}
                            </div>

                            <div className="daily-range">
                                <span className="daily-min">
                                    {Math.floor(min)}°
                                </span>
                                <span className="range">
                                    <span className="range-meter" />
                                    <span className="range-current" />
                                </span>
                                <span className="daily-max">
                                    {Math.floor(max)}°
                                </span>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

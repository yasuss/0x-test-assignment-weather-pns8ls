import React from 'react'
import { getIcon } from '../../shared/lib/getIcon'
import { getRange } from '../../shared/lib/getRange'
import { getWeekDay } from '../../shared/lib/getWeekDay'
import './DailyForecastCard.styles.css'

interface MyCustomCSS extends React.CSSProperties {
    '--left': string
    '--right': string
}

interface IDailyForecastCardProps {
    forecast: {
        extreme: {
            min: number
            max: number
        }
        days: {
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
}

export const DailyForecastCard: React.FC<IDailyForecastCardProps> = (props) => {
    const { forecast } = props

    return (
        <div className="daily">
            <div className="daily-title">10-DAY FORECAST</div>
            <div className="daily-list">
                {forecast.days.map(
                    ({
                        date,
                        day: {
                            mintemp_c: min,
                            maxtemp_c: max,
                            daily_will_it_rain,
                            daily_chance_of_rain,
                            condition,
                        },
                    }) => {
                        const { left, right } = getRange(
                            forecast.extreme,
                            min,
                            max
                        )

                        return (
                            <div className="daily-row">
                                <div className="daily-time">
                                    {getWeekDay(date)}
                                </div>

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
                                        <span
                                            className="range-meter"
                                            style={
                                                {
                                                    '--left': `${left}%`,
                                                    '--right': `${right}%`,
                                                } as MyCustomCSS
                                            }
                                        />
                                        <span className="range-current" />
                                    </span>
                                    <span className="daily-max">
                                        {Math.floor(max)}°
                                    </span>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

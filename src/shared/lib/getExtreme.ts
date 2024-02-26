import { DailyForecast } from '../types'

export const getExtreme = (forecast: DailyForecast[]) => {
    let min = Infinity
    let max = -Infinity

    for (let el of forecast) {
        if (el.day.mintemp_c < min) min = Math.floor(el.day.mintemp_c)
        if (el.day.maxtemp_c > max) max = Math.floor(el.day.maxtemp_c)
    }

    return {
        max,
        min,
    }
}

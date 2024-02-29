type Condition = {
    text: string
    code: number
}

export interface Location {
    name: string
    lat: number
    lon: number
}

export interface Current {
    temp_c: number
    condition: Condition
}

export interface HourlyForecast {
    time: string
    temp_c: number
    condition: Condition
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
}

export interface DailyForecast {
    date: string
    day: {
        maxtemp_c: number
        mintemp_c: number
        daily_will_it_rain: number
        daily_chance_of_rain: number
        daily_will_it_snow: number
        daily_chance_of_snow: number
        condition: Condition
    }
    hour: HourlyForecast[]
}

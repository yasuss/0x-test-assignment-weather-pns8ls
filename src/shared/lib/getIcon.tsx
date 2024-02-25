import React from 'react'
import { Cloudy } from '../../weather/Cloudy'
import { LightRain } from '../../weather/LightRain'
import { PartlyCloudy } from '../../weather/PartlyCloudy'
import { Rain } from '../../weather/Rain'
import { Sun } from '../../weather/Sun'
import { Thunder } from 'src/weather/Thunder'

export const getIcon = (code: number) => {
    switch (code) {
        case 1000:
            return <Sun />
        case 1003:
            return <PartlyCloudy />
        case 1006:
        case 1009:
        case 1030:
            return <Cloudy />
        case 1063:
            return <Rain />
        case 1087:
            return <Thunder />
        case 1255:
            return <LightRain />
        default:
            return <Cloudy />
    }
}

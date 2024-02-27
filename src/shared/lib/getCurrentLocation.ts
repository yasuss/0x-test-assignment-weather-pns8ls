import { Location } from '../types'

interface ICurrentLocation {
    data?: Location
    error?: GeolocationPositionError
}

export const getCurrentLocation = async (): Promise<ICurrentLocation> =>
    new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude: lat, longitude: lon } = pos.coords
                resolve({ data: { name: 'Current Location', lat, lon } })
            },
            (error) => {
                resolve({ error })
            }
        )
    })

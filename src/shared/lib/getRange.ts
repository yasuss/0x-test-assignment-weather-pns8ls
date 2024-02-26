export const getRange = (
    extreme: { max: number; min: number },
    min: number,
    max: number
) => {
    let diff = extreme.max - extreme.min
    let left = ((Math.floor(min) - extreme.min) / diff) * 100
    let right = ((extreme.max - Math.floor(max)) / diff) * 100

    return {
        left: Math.floor(left),
        right: Math.floor(right),
    }
}

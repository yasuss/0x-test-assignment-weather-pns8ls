export const getBackground = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 11) {
        return 'moring'
    }
    if (hour >= 11 && hour < 17) {
        return 'day'
    }
    if (hour >= 17 && hour < 21) {
        return 'evening'
    }

    return 'night'
}

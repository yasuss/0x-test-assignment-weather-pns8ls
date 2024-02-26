export const getTime = (time: string) => {
    const now = new Date()
        .toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true,
        })
        .replace(' ', '')
    const currTime = new Date(time)
        .toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true,
        })
        .replace(' ', '')

    return now === currTime ? 'Now' : currTime
}

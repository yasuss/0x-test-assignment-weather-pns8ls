export const getWeekDay = (date: string) => {
    const today = new Date()

    return today.toDateString() === new Date(date).toDateString()
        ? 'Today'
        : new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
          }).format(new Date(date))
}

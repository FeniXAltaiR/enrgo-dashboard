import dayjs from 'dayjs'

export const getDateRangeOfDay = (date?: string, format = 'YYYY-MM-DD') => {
  return [dayjs(date).format(format), dayjs(date).add(1, 'days').format(format)]
}

export const getDateRangeOfMonth = (date?: string, format = 'YYYY-MM-DD') => {
  return [
    dayjs(date).subtract(1, 'months').format(format),
    dayjs(date).format(format),
  ]
}

export const getDateRangeOfYear = (
  date?: string,
  format = 'YYYY-MM-DD'
): [string, string] => {
  return [
    dayjs(date).subtract(1, 'years').format(format),
    dayjs(date).format(format),
  ]
}

export const getToday = (format = 'YYYY-MM-DD') => {
  return dayjs().format(format)
}

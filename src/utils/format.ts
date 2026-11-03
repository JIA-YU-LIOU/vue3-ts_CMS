import dayjs from 'dayjs'

export const formatUTC = (utcString: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(utcString).format(format)
}

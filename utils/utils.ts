import dayjs from "dayjs"

export const formatDate = (date: string | Date, format?: string): string => {
  if (format) {
    return dayjs(date).format(format)
  }
  return dayjs(date).format("MMMM D, YYYY [at] h:mm A")
}

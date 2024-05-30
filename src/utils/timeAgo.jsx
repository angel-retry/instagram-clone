export const timeAgo = (timestamp) => {
  const now = Date.now()
  const diff = now - timestamp

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day

  if (diff < minute) {
    return 'just now'
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute)
    return `${minutes} minutes ago`
  } else if (diff < day) {
    const hours = Math.floor(diff / hour)
    return `${hours} hours ago`
  } else if (diff < week) {
    const days = Math.floor(diff / day)
    return `${days} days ago`
  } else if (diff < month) {
    const weeks = Math.floor(diff / week)
    return `${weeks} weeks ago`
  } else {
    const months = Math.floor(diff / month)
    return `${months} months ago`
  }
}

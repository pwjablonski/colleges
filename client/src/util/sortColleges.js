export default function sortColleges (colleges, field, direction) {
  return colleges.sort((a, b) => {
    if (direction === 'DESC') {
      if (a[field] < b[field]) {
        return 1
      }
      if (a[field] > b[field]) {
        return -1
      }
    }
    if (direction === 'ASC') {
      if (a[field] < b[field]) {
        return -1
      }
      if (a[field] > b[field]) {
        return 1
      }
    }
    return 0
  })
}

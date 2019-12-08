export default function filterColleages (colleges, filters) {
  return colleges.filter((college) => {
    let shouldReturnOnSize = true
    if (filters['latest.student.size'] === 'small') {
      shouldReturnOnSize = college['latest.student.size'] < 5000
    } else if (filters['latest.student.size'] === 'medium') {
      shouldReturnOnSize = college['latest.student.size'] > 5000 && college['latest.student.size'] < 15000
    } else if (filters['latest.student.size'] === 'large') {
      shouldReturnOnSize = college['latest.student.size'] > 15000
    }

    let shouldReturnOnRate = true
    if (filters['latest.admissions.admission_rate.overall'] === 'low') {
      shouldReturnOnRate = college['latest.admissions.admission_rate.overall'] < 0.25
    } else if (filters['latest.admissions.admission_rate.overall'] === 'middle') {
      shouldReturnOnRate = college['latest.admissions.admission_rate.overall'] > 0.25 && college['latest.admissions.admission_rate.overall'] < 0.5
    } else if (filters['latest.admissions.admission_rate.overall'] === 'high') {
      shouldReturnOnRate = college['latest.admissions.admission_rate.overall'] > 0.5
    }

    return shouldReturnOnSize && shouldReturnOnRate ? college : null
  })
}

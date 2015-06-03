this.models = {}

Date.Timecop = function() {
  this.daysOffset = 0
}

Date.timecop = new Date.Timecop

Date.Timecop.prototype.travelDays = function(newOffset) {
  this.daysOffset = newOffset
}

Date.Timecop.prototype.now = function() {
  return (new Date).add_days(this.daysOffset)
}

Date.new = function(x) {
  if (x === undefined) { return Date.new(+Date.timecop.now()) }
  return new Date(x)
}

Date.prototype.add_days = function(x) {
  var result = new Date(+this)
  result.setDate(result.getDate() + x)
  return result
}

Date.prototype.dayStart = function() {
  var result = new Date(+this)
  result.setHours(0)
  result.setMinutes(0)
  result.setSeconds(0)
  result.setMilliseconds(0)
  return result
}

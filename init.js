this.models = {}

Date.new = function(x) {
  if (x === undefined) { return Date.new(+new Date) }
  return new Date(x)
}

Date.prototype.add_days = function(x) {
  var result = new Date(+this)
  result.setDate(result.getDate() + x)
  return result
}

var Day = models.Day = function(attributes) {
  this.striked = attributes.striked
  this.index = attributes.index
  this.when = Date.new(attributes.when)
}

riot.observable(Day)

Day.prototype.strike = function() {
  this.striked = true
  Day.trigger("update", this)
}

Day.prototype.feed_mark = function(mark) {
  if (!this._same_day(mark.when)) { return }
  this.strike()
}

Day.prototype._same_day = function(other_when) {
  return this.when.getDate() == other_when.getDate() &&
    this.when.getMonth() == other_when.getMonth() &&
    this.when.getFullYear() == other_when.getFullYear()
}

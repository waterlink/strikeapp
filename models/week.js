var day = 1000 * 60 * 60 * 24,
    week_days = 7 * day,
    now = new Date,
    weeks_count = 52

var Week = models.Week = function(attributes) {
  this.index = attributes.index
  this.when = new Date(attributes.when)
  this.when.setHours(0)
  this.when.setMinutes(0)
  this.when.setSeconds(0)
  this.when.setMilliseconds(0)
  this.end_of_week = new Date(+this.when + week_days)
  this._init_days()
}

Week.last_year = function() {
  var weeks = [],
      next_sunday = Week._next_sunday(),
      marks = models.Mark.last_year()

  for (var i = 0; i < weeks_count; ++i) {
    week = new Week({
      index: i,
      when: +next_sunday - week_days * (weeks_count - i),
    })

    week.feed_marks(marks)

    weeks[i] = week
  }

  return weeks
}

Week._next_sunday = function() {
  return new Date(+now + day * Week._days_until_sunday_left())
}

Week._days_until_sunday_left = function() {
  return (7 - now.getDay()) % 7
}

Week.prototype.feed_marks = function(marks) {
  for (var i = 0; i < marks.length; ++i) {
    this.feed_mark(marks[i])
  }
}

Week.prototype.feed_mark = function(mark) {
  if (!this._same_week(mark.when)) { return }
  this._each_day(function(day) {
    day.feed_mark(mark)
  })
}

Week.prototype._same_week = function(other_when) {
  return other_when >= this.when &&
    other_when < this.end_of_week
}

Week.prototype._each_day = function(fn) {
  for (var i = 0; i < 7; ++i) {
    this.days[i] = this.days[i] || this._init_day(i)
    fn && fn(this.days[i])
  }
}

Week.prototype._init_day = function(index) {
  return new models.Day({
    striked: false,
    index: index,
    when: +this.when + index * day,
  })
}

Week.prototype._init_days = function() {
  this.days = []
  this._each_day()
}

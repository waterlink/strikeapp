var now = Date.new(),
    yesterday = now.add_days(-1),
    week_ago = now.add_days(-7),
    year_ago = now.add_days(-366)

var Mark = models.Mark = function(attributes) {
  riot.observable(this)
  this.when = Date.new(attributes.when)
}

riot.observable(Mark)

Mark.suffix = "Mark"
Mark._data = models.Store.new(Mark)

Mark.all = function() {
  return Mark._data.load()
}

Mark.last_year = function() {
  return Mark.all().filter(function(mark) {
    return mark.isLastYear()
  })
}

Mark.create = function(attributes) {
  return Mark.insert(new Mark(attributes))
}

Mark.createNow = function() {
  return Mark.create({ when: Date.new() })
}

Mark.hasToday = function() {
  return Mark.all().filter(function(mark) {
    return mark.isToday()
  }).length > 0
}

Mark.insert = function(mark) {
  Mark._data.push(mark)
  Mark.trigger("insert", mark)
  return mark
}

Mark.prototype.isLastYear = function() {
  return this.when > Date.new(year_ago)
}

Mark.prototype.isToday = function() {
  return +this.when.dayStart() == +Date.new().dayStart()
}

var now = Date.new(),
    yesterday = now.add_days(-1),
    week_ago = now.add_days(-7),
    year_ago = now.add_days(-366)

var Mark = models.Mark = function(attributes) {
  riot.observable(this)
  this.when = Date.new(attributes.when)
}

riot.observable(Mark)

Mark._data = []

Mark.all = function() {
  return Mark._data
}

Mark.last_year = function() {
  return Mark.all().filter(function(mark) {
    return mark.isLastYear()
  })
}

Mark.create = function(attributes) {
  return Mark.insert(new Mark(attributes))
}

Mark.insert = function(mark) {
  Mark._data.push(mark)
  Mark.trigger("insert", mark)
  return mark
}

Mark.prototype.isLastYear = function() {
  return this.when > Date.new(year_ago)
}

// FIXME temporary example data
Mark.create({ when: week_ago })
Mark.create({ when: yesterday })
Mark.create({ when: now })

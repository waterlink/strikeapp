var day = 1000 * 60 * 60 * 24,
    now = new Date,
    yesterday = now - day,
    week_ago = now - 7 * day,
    year_ago = now - 366 * day

var Mark = models.Mark = function(attributes) {
  riot.observable(this)
  this.when = new Date(attributes.when)
}

riot.observable(Mark)

Mark._data = []

Mark.all = function() {
  return Mark._data
}

Mark.last_year = function() {
  return Mark.all().filter(function(mark) {
    return mark.when > new Date(year_ago)
  })
}

Mark.create = function(attributes) {
  return Mark.insert(new Mark(attributes))
}

Mark.insert = function(mark) {
  Mark._data.push(mark)
  return mark
}

// FIXME temporary example data
Mark.create({ when: week_ago })
Mark.create({ when: yesterday })
Mark.create({ when: now })

var day = 1000 * 60 * 60 * 24,
    now = new Date,
    yesterday = now - day,
    week_ago = now - 7 * day

var Mark = models.Mark = function(attributes) {
  riot.observable(this)
  this.when = new Date(attributes.when)
}

riot.observable(Mark)

Mark._data = []

Mark.all = function() {
  return Mark._data
}

// FIXME temporary, last year = all
Mark.last_year = Mark.all

Mark.create = function(attributes) {
  Mark.insert(new Mark(attributes))
}

Mark.insert = function(mark) {
  Mark._data.push(mark)
}

// FIXME temporary example data
Mark.create({ when: week_ago })
Mark.create({ when: yesterday })
Mark.create({ when: now })

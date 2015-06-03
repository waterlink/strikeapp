describe("Mark", function() {
  var Mark = models.Mark,
      mark,

      timestampsOf = function(marks) {
        return marks.map(function(x) { return +x.when })
      }

  beforeEach(function() {
    mark = new Mark({ when: yesterday })
  })

  it("can be instantiated", function() {
    expect(mark.when).toEqual(Date.new(yesterday))
  })

  it("instantitated mark is not persisted", function() {
    expect(timestampsOf(Mark.all()).indexOf(+mark.when))
      .toEqual(-1)
  })

  describe(".insert", function() {
    it("persists passed in Mark", function() {
      Mark.insert(mark)
      expect(timestampsOf(Mark.all()).indexOf(+mark.when))
        .toEqual(0)
    })
  })

  describe(".create", function() {
    beforeEach(function() {
      mark = Mark.create({ when: week_ago })
    })

    it("returns instantiated Mark", function() {
      expect(mark.when).toEqual(Date.new(week_ago))
    })

    it("persists instantiated Mark", function() {
      expect(timestampsOf(Mark.all()).indexOf(+mark.when))
        .toEqual(0)
    })
  })

  describe("Query methods", function() {
    var old_mark,
        very_old_mark

    beforeEach(function() {
      old_mark = Mark.create({ when: now.add_days(-365) })
      very_old_mark = Mark.create({ when: now.add_days(-367) })
      mark = Mark.create({ when: now.add_days(-23) })
    })

    describe(".all", function() {
      it("returns all marks", function() {
        expect(timestampsOf(Mark.all()))
          .toEqual(timestampsOf([old_mark, very_old_mark, mark]))
      })
    })

    describe(".last_year", function() {
      it("returns only marks from last year", function() {
        expect(timestampsOf(Mark.last_year()))
          .toEqual(timestampsOf([old_mark, mark]))
      })
    })
  })
})

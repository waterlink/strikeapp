describe("Mark", function() {
  var Mark = models.Mark,
      mark

  beforeEach(function() {
    Mark._data = []
    mark = new Mark({ when: yesterday })
  })

  it("can be instantiated", function() {
    expect(mark.when).toEqual(new Date(yesterday))
  })

  it("instantitated mark is not persisted", function() {
    expect(Mark.all().indexOf(mark)).toEqual(-1)
  })

  describe(".insert", function() {
    it("persists passed in Mark", function() {
      Mark.insert(mark)
      expect(Mark.all().indexOf(mark)).toBeGreaterThan(-1)
    })
  })

  describe(".create", function() {
    beforeEach(function() {
      mark = Mark.create({ when: week_ago })
    })

    it("returns instantiated Mark", function() {
      expect(mark.when).toEqual(new Date(week_ago))
    })

    it("persists instantiated Mark", function() {
      expect(Mark.all().indexOf(mark)).toBeGreaterThan(-1)
    })
  })

  describe("Query methods", function() {
    var old_mark,
        very_old_mark

    beforeEach(function() {
      old_mark = Mark.create({ when: now - 366 * day })
      very_old_mark = Mark.create({ when: now - 367 * day })
      mark = Mark.create({ when: now - 23 * day })
    })

    describe(".all", function() {
      it("returns all marks", function() {
        expect(Mark.all())
          .toEqual([old_mark, very_old_mark, mark])
      })
    })

    describe(".last_year", function() {
      it("returns only marks from last year", function() {
        expect(Mark.last_year())
          .toEqual([old_mark, mark])
      })
    })
  })
})

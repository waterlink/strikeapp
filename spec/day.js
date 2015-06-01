describe("Day", function() {
  var Day = models.Day,
      day,
      Mark = models.Mark,
      context = describe,
      hour = 3600 * 1000

  beforeEach(function() {
    day = new Day({ striked: false, index: 3, when: yesterday })
  })

  it("can be instantiated", function() {
    expect(day.when).toEqual(new Date(yesterday))
    expect(day.index).toEqual(3)
    expect(day.striked).toEqual(false)
  })

  describe("#strike", function() {
    it("becomes striked", function() {
      day.strike()
      expect(day.striked).toEqual(true)
    })
  })

  describe("#feed_mark", function() {
    var mark

    context("when mark is not on the same day", function() {
      beforeEach(function() {
        mark = new Mark({ when: week_ago })
      })

      it("stays not striked", function() {
        day.feed_mark(mark)
        expect(day.striked).toEqual(false)
      })
    })

    context("when mark is on the same day", function() {
      beforeEach(function() {
        var now = day.when,
            today = new Date(+now)

        today.setHours(3)
        today.setMinutes(27)
        mark = new Mark({ when: today })
      })

      it("becomes striked", function() {
        day.feed_mark(mark)
        expect(day.striked).toEqual(true)
      })
    })
  })
})

describe("Week", function() {
  var Week = models.Week,
      week,
      context = describe,
      Mark = models.Mark,

      dayStart = function(when) {
        var result = Date.new(when)
        result.setHours(0)
        result.setMinutes(0)
        result.setSeconds(0)
        result.setMilliseconds(0)
        return result
      },

      eachDay = function(week, fn) {
        for (var i = 0; i < 7; ++i) {
          fn(week.days[i], i)
        }
      }

  beforeEach(function() {
    week = new Week({ when: yesterday })
  })

  it("can be instantiated", function() {
    expect(week.when).toEqual(dayStart(yesterday))
  })

  it("initializes days", function() {
    eachDay(week, function(aDay, i) {
      expect(aDay.when)
        .toEqual(Date.new(dayStart(yesterday).add_days(i)))
      expect(aDay.index).toEqual(i)
      expect(aDay.striked).toEqual(false)
    })
  })

  describe("#feed_marks", function() {
    var marks = [],
        mark, other_mark, another_mark

    beforeEach(function() {
      eachDay(week, function(day) {
        spyOn(day, "feed_mark")
      })
    })

    context("when no marks is in the week", function() {
      beforeEach(function() {
        mark = new Mark({ when: week_ago.add_days(-1) })
        other_mark = new Mark({ when: yesterday.add_days(20) })
        marks = [mark, other_mark]
      })

      it("does nothing", function() {
        week.feed_marks(marks)
        eachDay(week, function(day) {
          expect(day.feed_mark).not.toHaveBeenCalledWith(mark)
          expect(day.feed_mark).not.toHaveBeenCalledWith(other_mark)
        })
      })
    })

    context("when one of the marks is in the week", function() {
      beforeEach(function() {
        mark = new Mark({ when: yesterday.add_days(2) })
        other_mark = new Mark({ when: week_ago.add_days(-1) })
        marks = [mark, other_mark]
      })

      it("feeds mark to all days inside the week", function() {
        week.feed_marks(marks)
        eachDay(week, function(day) {
          expect(day.feed_mark).toHaveBeenCalledWith(mark)
          expect(day.feed_mark).not.toHaveBeenCalledWith(other_mark)
        })
      })
    })

    context("when multiple marks are in the week", function() {
      beforeEach(function() {
        mark = new Mark({ when: yesterday.add_days(2) })
        other_mark = new Mark({ when: week_ago.add_days(-1) })
        another_mark = new Mark({ when: yesterday })
        marks = [mark, other_mark, another_mark]
      })

      it("feeds thes marks to all days inside the week", function() {
        week.feed_marks(marks)
        eachDay(week, function(day) {
          expect(day.feed_mark).toHaveBeenCalledWith(mark)
          expect(day.feed_mark).not.toHaveBeenCalledWith(other_mark)
          expect(day.feed_mark).toHaveBeenCalledWith(another_mark)
        })
      })
    })
  })

  describe(".last_year", function() {
    it("returns weeks for last year", function() {
      var weeks = Week.last_year()

      expect(weeks.length).toEqual(52)

      for (var i = 1; i < 52; ++i) {
        var week = weeks[i],
            prev_week = weeks[i - 1]

        expect(week.when)
          .toEqual(Date.new(prev_week.when.add_days(7)))
      }

      expect(weeks[51].when).toBeLessThan(Date.new(+now + 1))
      expect(weeks[51].when).toBeGreaterThan(now.add_days(-7))
    })
  })
})

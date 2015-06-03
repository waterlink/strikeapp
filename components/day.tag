<strikeapp-day>
  <svg>
    <rect strikeapp:fill={ color } strikeapp:y={ y } width=11 height=11></rect>
  </svg>

  <script>
    this.mixin("svg")
    this.initSvg()

    this.day = this.opts.day
    this.striked = this.day.striked
    this.index = this.day.index

    var that = this
    Day.on("update", function(day) {
      if (that.day.when != day.when) { return }
      that.striked = day.striked
      that.trigger("striked-update")
    })

    this.y = 13 * this.index

    isInThePast() {
      return this.day.when <= now
    }

    colorFromStriked() {
      if (!this.isInThePast()) { return "#ffffff" }
      return this.striked ? "#196a27" : "#eeeeee"
    }

    this.color = this.colorFromStriked()

    this.on("striked-update", function() {
      this.color = this.colorFromStriked()
      this.update()
      this.trigger("update")
    })
  </script>
</strikeapp-day>

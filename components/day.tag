<strikeapp-day>
  <svg>
    <rect strikeapp:fill={ color } strikeapp:y={ y } width=11 height=11></rect>
  </svg>

  <script>
    this.mixin("svg")
    this.initSvg()

    this.striked = this.opts.day.striked
    this.index = this.opts.day.index

    this.color = this.striked ? "#196a27" : "#eeeeee"
    this.y = 13 * this.index
  </script>
</strikeapp-day>

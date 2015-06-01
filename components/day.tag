<strikeapp-day>
  <svg>
    <rect fill={ color } y={ y } width=11 height=11></rect>
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

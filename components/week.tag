<strikeapp-week>
  <svg>
    <g strikeapp:transform={ translate }>
      <strikeapp-day each={ days } day={ this }></strikeapp-day>
    </g>
  </svg>

  <script>
    this.mixin("svg")
    this.initSvg()

    this.days = this.opts.week.days
    this.index = this.opts.week.index

    this.translate = "translate(" + 13 * this.index + ", 0)"
  </script>
</strikeapp-week>

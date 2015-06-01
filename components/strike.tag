<strikeapp-strike>
  <svg class="calendar-graph" height="110px" width="721px" xmlns:strikeapp="https://waterlink.github.io/strikeapp/xmlns">
    <g transform="translate(20, 20)">
      <strikeapp-week each={ weeks } week={ this }></strikeapp-week>
    </g>
  </svg>

  <script>
    this.weeks = models.Week.last_year()

    translate(x, y) {
      "translate(" + x + ", " + y + ")"
    }
  </script>
</strikeapp-strike>

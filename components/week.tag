<strikeapp-week>
  <svg>
    <g transform={ translate(13 * index, 0) }>
      <strikeapp-day each={ days } day={ this }></strikeapp-day>
    </g>
  </svg>

  <script>
    this.days = this.opts.week.days
    this.index = this.opts.week.index

    translate(x, y) {
      return "translate(" + x + ", " + y + ")"
    }

    this.on("mount", function(){
      var inside = this.root.firstChild
      while(inside.firstChild) {
        this.root.parentNode.insertBefore(
          inside.firstChild, this.root
        )
      }
      this.root.remove()
    })

  </script>
</strikeapp-week>

<strikeapp-day>
  <svg>
    <rect fill={ color } y={ y } width=11 height=11></rect>
  </svg>

  <script>
    this.striked = this.opts.day.striked
    this.index = this.opts.day.index

    this.color = this.striked ? "#196a27" : "#eeeeee"
    this.y = 13 * this.index

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
</strikeapp-day>

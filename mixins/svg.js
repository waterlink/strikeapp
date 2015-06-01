riot.mixin("svg", {
  svgLateBoundAttributes: ["fill", "y", "transform"],
  svgScope: "strikeapp:",

  initSvg: function() {
    this.on("mount", function() {
      var inside = this.root.firstChild
      this.svgElements = []
      while(inside.firstChild) {
        this.svgElements.push(inside.firstChild)
        this.root.parentNode.insertBefore(
          inside.firstChild, this.root
        )
      }
      this.root.remove()
    })

    this.svgLateBinding()
  },

  svgLateBinding: function() {
    this.on("mount update", function() {
      if (!this.svgElements) { return }

      for (var j = 0; j < this.svgElements.length; ++j) {
        var el = this.svgElements[j],
            names = this.svgLateBoundAttributes
        for (var i = 0; i < names.length; ++i) {
          var name = names[i],
              scopedName = this.svgScope + name,
              value = el.getAttribute &&
                el.getAttribute(scopedName)

          value && el.setAttribute(
            name,
            value
          )
        }
      }
    })
  }
})

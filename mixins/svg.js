riot.mixin("svg", {
  initSvg: function() {
    this.on("mount", function() {
      var inside = this.root.firstChild
      while(inside.firstChild) {
        this.root.parentNode.insertBefore(
          inside.firstChild, this.root
        )
      }
      this.root.remove()
    })
  }
})

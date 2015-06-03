<strikeapp-tapzone>
  <div>
    <a class={ button: true, big: true, success: true } onclick={ tap } href="#">
      { title() }
    </a>
  </div>

  <script>
    tap(e) {
      if (models.Mark.hasToday()) { return }
      models.Mark.createNow()
    }

    title() {
      return models.Mark.hasToday() ? "undo" : "mark now"
    }
  </script>
</strikeapp-tapzone>

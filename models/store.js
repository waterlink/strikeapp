var Store = models.Store = function(constructor) {
  this.constructor = constructor
  this.prefix = "Store::" + constructor.suffix
}

Store.new = function(constructor) {
  return new Store(constructor)
}

Store.prototype._reset = function() {
  localStorage.setItem(this.prefix, JSON.stringify([]))
  this._rawObjects = null
}

Store.prototype.push = function(object) {
  this._raw().push(object)
  this._save()
}

Store.prototype.load = function() {
  var objects = []

  for (var i = 0; i < this._raw().length; ++i) {
    objects.push(new this.constructor(this._raw()[i]))
  }

  return objects
}

Store.prototype._save = function() {
  localStorage.setItem(this.prefix, JSON.stringify(this._raw()))
}

Store.prototype._raw = function() {
  this._rawObjects = this._rawObjects || this._fetchRaw()
  return this._rawObjects
}

Store.prototype._fetchRaw = function() {
  return JSON.parse(localStorage.getItem(this.prefix)) || []
}

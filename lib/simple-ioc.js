class SimpleIoc {
  constructor({ name = '' } = {}) {
    this.name = name
    this._store = new Map()
  }
  _getToken(Ctor) {
    return Ctor.name
  }
  has(Ctor) {
    return this._store.has(this._getToken(Ctor))
  }
  bind(Ctor) {
    this._store.set(this._getToken(Ctor), {
      instance: null,
      useClass: Ctor
    })
    Ctor.prototype._inject = function(...args) {
      this.inject && this.inject(...args)
      return this
    }

    return this
  }
  create(providers = []) {
    providers.forEach(p => {
      this.bind(p)
    })
    return this
  }
  _check(provider) {
    if (!provider) {
      throw new Error(` ${this.name} get error,please give a provider`)
    }
    let token = this._getToken(provider)
    const provide = this._store.get(token)
    if (!provide) {
      throw new Error(
        `${this.name} can not find -> ${provider.name} should bind first`
      )
    }
    return provide
  }
  get(provider) {
    const provide = this._check(provider)
    if (!provide.instance) {
      provide.instance = new provide.useClass()._inject(this)
    }
    return provide.instance
  }
  new(provider, ...args) {
    const provide = this._check(provider)
    return new provide.useClass(...args)._inject(this)
  }
}

module.exports = SimpleIoc

const getToken = Symbol(),
  check = Symbol()

class LightContainer {
  constructor({ name = '' } = {}) {
    this.name = name
    this._store = new Map()
  }
  [getToken](Ctor) {
    return Ctor.name
  }
  has(Ctor) {
    return this._store.has(this[getToken](Ctor))
  }
  bind(Ctor) {
    this._store.set(this[getToken](Ctor), {
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
  [check](provider) {
    if (!provider) {
      throw new Error(` ${this.name} get error,please give a provider`)
    }
    let token = this[getToken](provider)
    const provide = this._store.get(token)
    if (!provide) {
      throw new Error(
        `${this.name} can not find -> ${provider.name} should bind first`
      )
    }
    return provide
  }
  getClass(provider) {
    const provide = this[check](provider)
    return provide.useClass
  }
  get(provider, ...args) {
    const provide = this[check](provider)
    if (!provide.instance) {
      provide.instance = new provide.useClass(...args)._inject(this)
    }
    return provide.instance
  }
  new(provider, ...args) {
    const provide = this[check](provider)
    return new provide.useClass(...args)._inject(this)
  }
}

module.exports = LightContainer

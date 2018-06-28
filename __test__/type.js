// @ts-check
const { LightContainer } = require('light-container')

class A {
  constructor() {
    this.a = 1
  }
}

class B {
  constructor() {
    this.b = 2
  }
  /**
   * @param {LightContainer} c
   */
  inject(c) {
    this.a = c.get(A)
  }
}

class C {
  constructor({ name = 'c' }) {
    this.name = name
  }
}

const c = new LightContainer().create([A, B, C])

const C2 = c.getClass(C)

new C2({
  name: 'a'
})
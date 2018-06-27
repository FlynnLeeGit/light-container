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

const c = new LightContainer().create([A, B])


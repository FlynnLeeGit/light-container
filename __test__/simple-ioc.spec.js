const { LightContainer } = require('../index')

class A {
  constructor() {
    this.a = 1
  }
}
class B {
  constructor(b = 2) {
    this.b = b
  }
}

class C {
  inject(c) {
    this.a = c.get(A)
    this.b = c.get(B)
  }
}

describe('simple-ioc basic', () => {
  test('should exist', () => {
    expect(LightContainer).toBeDefined()
  })
  test('should instanceof Ctr', () => {
    const sc = new LightContainer().create([A])
    expect(sc.get(A) instanceof A).toBeTruthy()
  })
  test('should get same instance', () => {
    const sc = new LightContainer().create([A])
    expect(sc.get(A)).toEqual(sc.get(A))
  })
  test('should new instance', () => {
    const sc = new LightContainer().create([A])
    expect(sc.new(A) === sc.new(A)).toBeFalsy()
  })

  test('should has api work', () => {
    const sc = new LightContainer().create([A])
    expect(sc.has(A)).toBeTruthy()
  })

  test('should get different instance when in different container', () => {
    const sc1 = new LightContainer().create([A])
    const sc2 = new LightContainer().create([A])
    expect(sc1.get(A) === sc2.get(A)).toBeFalsy()
  })

  test('should get original class', () => {
    const sc = new LightContainer().create([A])
    expect(sc.getClass(A)).toEqual(A)
  })

  test('should get instance can accope arguments', () => {
    const sc = new LightContainer().create([B])
    expect(sc.get(B, 22)).toEqual({ b: 22 })
  })
  test('should new instance can accepet arguments', () => {
    const sc = new LightContainer().create([B])
    expect(sc.new(B, 22)).toEqual({ b: 22 })
  })

  test('should throw errors', () => {
    const sc1 = new LightContainer().create()
    expect(() => {
      sc1.get()
    }).toThrow()
    const sc2 = new LightContainer().create([A])
    expect(() => {
      sc2.get(B)
    }).toThrow()
  })

  test('should inject effect', () => {
    const sc = new LightContainer().create([A, B, C])
    const c = sc.get(C)
    expect(c.a instanceof A).toBeTruthy()
    expect(c.b instanceof B).toBeTruthy()
  })
})

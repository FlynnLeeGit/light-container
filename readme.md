## light-container

a simplest ioc container,all injected instance is class based,
no factory,no value,no constant

```js
const { LightContainer } = require('light-container')

class A {
  constructor() {
    this.a = 1
  }
}
class B {
  // inject is a magic method,we inject deps here

  /**
   * @param {LightContainer} c 
   *
  **/
  inject(c) {
    this._a = c.get(A)
  }
}
class C {
  constructor(c) {
    this.c = c
  }
}

const container = new LightContainer().create([A, B, C])

// get is Singleton
console.log(container.get(B) === container.get(B)) // truthy
//
console.log(container.new(B) === container.new(B)) // falsy

// has
container.has(B) // true

console.log(container.get(B)) // {_a: {a:1} }

// .new with arguments
container.new(C, 3) // { c:3 }


// getClass

container.getClass(A) === A //true
```

## that's it!

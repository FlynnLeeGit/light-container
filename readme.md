## simple-ioc

a simplest ioc container,all injected instance is class based,
no factory,no value,no constant

```js
const { SimpleIoc } = require('simple-ioc')

class A {
  constructor() {
    this.a = 1
  }
}
class B {
  // inject is a magic method,we inject deps here
  inject(c) {
    this._a = c.get(A)
  }
}
class C {
  constructor(c) {
    this.c = c
  }
}

const container = new SimpleIoc().create([A, B, C])

// get is Singleton
console.log(container.get(B) === container.get(B)) // truthy
//
console.log(container.new(B) === container.new(B)) // falsy

// has
container.has(B) // true

console.log(container.get(B)) // {_a: {a:1} }

// .new with arguments
container.new(C, 3) // { c:3 }
```

## that's it!

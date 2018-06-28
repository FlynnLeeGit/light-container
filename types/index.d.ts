declare module 'light-container' {
  interface Ctor_Static<T> {
    new (...args): T
  }
  export class LightContainer {
    new<T>(Ctor: Ctor_Static<T>, ...args): T
    get<T>(Ctor: Ctor_Static<T>, ...args): T
    create(providers: Array<{ new (...args) }>): this
    bind<T>(Ctor: Ctor_Static<T>): this
    has<T>(Ctor: Ctor_Static<T>): Boolean
    getClass<T>(Ctor: T): T
  }
}

# mixmix

mix, stir, and blend; solve the problems with 'extend'



## What it can do

* Enable multiple inheritance for ES6 classes in Javascript
* Merge classes and instantiate them into one big class



## Installation

The recommended method using `npm`:

```bash
npm i mixmix
```

If you prefer using CDN's instead:

```html
<!-- for DOM (window.mixmix), CommonJS, AMD -->
<script src="...coming soon/mixmix.min.js"></script>

<!-- for ESM (import mixmix from 'mixmix') -->
<script src="...coming soon/mixmix.esm.min.js"></script>
```



## Basic Usage

#### Initial setup:

Import it into your project if you're using node, webpack, or any package manager:

```js
const mixmix = require('mixmix');
// OR if using ESM, `import mixmix from 'mixmix'`
```

These will be the example classes that will be worked on:

```js
class Sand {
    buildCastle() {
        console.log('build build build');
    }
}
class Witch {
    castSpell() {
        console.log('cast cast cast');
    }
}
```



#### Extend multiple classes (multiple inheritance):

`mixmix()` is used similarly to `Object.assign()`, except it returns a copy of all the classes combined instead of modifying the first argument.

```js
class Sandwich extends mixmix(Sand, Witch) {
    eat() {
        this.buildCastle();
        this.castSpell();
    }
}
```

Optionally, in typescript you may add an `interface` to get back type checking functionality:

```ts
interface Sandwich extends Sand, Witch {}
// ...class Sandwich extends mixmix(Sand, Witch) {}
```



#### Merge and instantiate:

`mixmix()` will return a new class with a modified constructor. This constructor is sort of a "master" constructor as it is in charge of instantiating all of the combined child constructors.

```ts
const Sandwich = mixmix(Sand, Witch);
const mSandwich = new Sandwich({Sand: [], Witch: []})
```

As seen above, `mixmix()` will take in an object of type: `Record<string, any[]>`. The name of the class will be the key, while the arguments intended to be passed to the invoked constructor will be an array in the value. It will then go one key at a time (sequentially) and invoke the constructor with the name of the key.

For example, this line of code:

```js
const mSandwich = new Sandwich({
    Sand: [], 
    Witch: ['Son', 'of', 'a', NaN],
});
```

will invoke:

```js
new Sand();
new Witch('Son', 'of', 'a', NaN);
```

The results of the invocation will be applied to the master class, which in this case is `Sandwich` 

For example, these lines of code:

```js
class Foo {
    constructor() {
        this.bar = 69;
    }
}

const mFoo = new (mixin(Foo))({
    Foo: [],
})
```

will result in `mFoo` having `bar` inside its instance.



### Building

A `build.bat` file is provided in the `./src` directory (sorry linux/mac users).

`header.js` and `header.esm.js` files are used to prefix the final built files.



### Contributing

If you fork this repo and find ways to make improvements (or find one of the probably many bugs), feel free to submit a pull request!
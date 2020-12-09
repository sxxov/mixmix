
# mixmix

mix, stir, and blend; solve the problems with 'extend'

>  (**~0.5kb**, ESM version, minified & gzipped).



## What it can do

* Enable multiple inheritance for ES6 classes in Javascript (and Typescript).
* Merge classes into one big class.
* Instantiate the merged classes with arguments passed into the individual classes.



## Installation

The recommended method using `npm`:

```bash
npm i mixmix
```

If you prefer using CDN's instead:

```html
<!-- UMD (ES6 and above) -->
<!-- Example usage: window.mixmix() or require()... -->
<script src="https://unpkg.com/mixmix/dist/mixmix.min.js"></script>

<!-- ESM (ES6 and above) -->
<!-- Example usage: import mixmix from 'mixmix' -->
<script src="https://unpkg.com/mixmix/dist/mixmix.min.esm.js"></script>

<!-- UMD (ES5) -->
<!-- Example usage: window.mixmix() or require()... -->
<script src="https://unpkg.com/mixmix/dist/mixmix.min.es5.js"></script>
```



## Quick Start

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
// interface that extends the same things that is mixed
interface Sandwich extends Sand, Witch {}
class Sandwich extends mixmix(Sand, Witch) {
    // ...
}
```



#### Merge and instantiate:

`mixmix()` will return a new class with a modified "master" constructor that invokes all the child constructors:

```ts
const Sandwich = mixmix(Sand, Witch);
/* 
	Returns:
	
    class SandWitch {
        constructor(parametersMap: Record<ClassNameString, any[]> | any[] = null) {
            // master constructor
        }
    } 
*/
```
The results of the invocation will be applied to the master class's instance, which in the following case will be `sandwich` :

```ts
const sandwich = new Sandwich(/* parametersMap (see below) */);
```

The name property of the class will then be the combination of all classes:

```ts
sandwich.name
/* 
	Returns:
	
	"SandWitch"
*/
```

>Note: This will probably not be the *class variable name* you will be referencing in your code, as it will more likely be the variable it's stored in (eg. `const A = mixmix(A, B); A.name === 'AB'`).

If you would like to use the constructor of one of the classes passed in, instead of this Frankenstein's monster, you can use `mixmix.withConstructorAt`

```ts
const Sandwich = mixmix.withConstructorAt(0, Sand, Witch) /* (see below) */
const sandwich = new Sandwich();
// Only `Sand.constructor` is executed
```



## API

##### mixmix(...class)

* `...class`: Class[]

```ts
const Sandwich = mixmix(Sand, Witch);
const sandwich = new Sandwich(/* parametersMap (see below) */);
```

###### parametersMap

`Record<ClassNameString, any[]> | any[] | null | undefined`

It takes in an object with the target class's name ("`Sand`" or "`Witch`") as the key, and an array with parameters to pass into its constructor as the value.

```ts
const Sandwich = mixmix(Sand, Witch);
const sandwich = new Sandwich({
    Sand: [],
    Witch: ['Son', 'of', 'a', NaN],
});
/*
	Executes:
	
	new Sand();
	new Witch('Son', 'of', 'a', NaN);
*/
```



##### mixmix.withConstructorAt(index, ...class)

* `index`: number
* `...class`: Class[]

```ts
const Sandwich = mixmix.withConstructorAt(0, Sand, Witch);
const sandwich = new Sandwich(/* `...parameters` into `Sand` */);

/*
	Executes:
	
	new Sand(...parameters);
	// loop through all Witch's keys, something like this
	Sandwich.prototype[key] = Witch.prototype[key] 
*/
```



##### mixmix.withSameParamsIntoConstructors(...class)

* `...class`: Class[]

```ts
const Sandwich = mixmix.withSameParamsIntoConstructors(Sand, Witch);
const sandwich = new Sandwich(/* `...parameters` into `Sand` and `Witch` */);

/*
	Executes:
	
	new Sand(...parameters);
	new Witch(...parameters);
*/
```





### Building/Testing

* `npm run build` to build using Rollup into the "dist" folder.
* ```npm run test``` to test using Jest with the tests in the "test" folder.



### Contributing

If you find ways to make improvements (or find one of the probably many bugs), feel free to submit a pull request!
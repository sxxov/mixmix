type Class = (new (...args: any[]) => any);
type ClassNameString = string;

// ['length', 'prototype', 'name']
// terser discards unused class names, so doing `class X {}`, would become `class {}`
// in chrome, anonymous classes have the `name` property, but in node they don't
const BASE_CLASS_PROPERTIES = Object.getOwnPropertyNames(class {}).concat('name');
const BASE_CLASS_PROTOTYPE_PROPERTIES = ['constructor'];

export default function mixmix(
	...classes: Class[]
): Class {
	class MixedClass {
		/* \
		|  | constructor will be executed if name of class is present as key in 'args',
		|  |
		|  | example...
		|  | 	new MixMixed({
		|  | 		A: [],
		|  |		B: ['argument'],
		|  |		IgApiClient: ['username', 'password'],
		|  | 	});
		|  |
		|  | equals to...
		|  | 	new A();
		|  |	new B('argument');
		|  |	new IgApiClient('username', 'password');
		\ */
		constructor(parametersMap: any[])
		constructor(parametersMap: Record<ClassNameString, any[]>)
		constructor(parametersMap: Record<ClassNameString, any[]> | any[] = null) {
			const allClassNames = classes
				.map((sourceClass) => sourceClass?.name);
			const isIntantiatingAllWithOverrideValue = (
				Array.isArray(parametersMap)
				|| parametersMap == null
			);
			const parametersClassNames = isIntantiatingAllWithOverrideValue
				? allClassNames
				: Object.keys(parametersMap);

			// use 'argsKeys' instead of 'className' to invoke in order of keys in 'args'
			for (let i = 0, l = parametersClassNames.length; i < l; ++i) {
				const parametersClassName = parametersClassNames[i];
				// if it's using override, then both arrays are the same, so skip the index scan
				const indexOfParametersClassName = isIntantiatingAllWithOverrideValue
					? i
					: allClassNames.indexOf(parametersClassName);

				// only invoke constructor if 'parametersClassName' is inside 'parametersMap' as a key
				if (indexOfParametersClassName === -1) {
					continue;
				}

				// invoke!!!
				Object
					.defineProperties(
						this,
						Object
							.getOwnPropertyDescriptors(
								new classes[indexOfParametersClassName](
									...(
										isIntantiatingAllWithOverrideValue
											// will be array since it's override value
											? parametersMap as any[]
											: parametersMap[parametersClassName]
									),
								),
							),
					);
			}
		}
	}

	const mixedClassName = classes
		.map((sourceClass) => sourceClass.name)
		.join('');

	Object.defineProperty(MixedClass, 'name', { value: mixedClassName });

	// clone static items and items in prototype — items to be instantiated
	// (except for constructor, it is handled above)
	for (let i = 0, l = classes.length; i < l; ++i) {
		const sourceClass = classes[i];

		// clone base class & prototype separately to be able to deal with constructor
		defineProperties(
			MixedClass,
			sourceClass,
			BASE_CLASS_PROPERTIES,
		);
		defineProperties(
			MixedClass.prototype,
			sourceClass.prototype,
			BASE_CLASS_PROTOTYPE_PROPERTIES,
		);
	}

	return MixedClass;
}

function defineProperties(
	target: any,
	source: any,
	excludedNames: string[],
): void {
	const propertyDescriptors = Object.getOwnPropertyDescriptors(source);
	const propertyNames = Object.keys(propertyDescriptors);

	for (let i = 0, l = propertyNames.length; i < l; ++i) {
		const propertyName = propertyNames[i];

		// ensure it is a unique property (not 'length', 'prototype', 'name', 'constructor')
		if (excludedNames.indexOf(propertyName) !== -1) {
			continue;
		}

		// define 'propertyName': 'propertyDescriptors[propertyName]'
		Object.defineProperty(
			target,
			propertyName,
			propertyDescriptors[propertyName],
		);
	}
}

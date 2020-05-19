/* eslint-disable max-classes-per-file */

type ClassItem = (new (...args: any[]) => any);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mixmix(
	...classes: ClassItem[]
): ClassItem {
	const processedTargetClass = class MixMixed {
		/* \
		|  | constructor will be executed if name of class is present as key in 'args',
		|  |
		|  | example...
		|  | 	new mMixMixed({
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
		constructor(args: Record<string, any[]>) {
			const classNames = classes
				.map(
					(sourceClass) => Object
						.getOwnPropertyDescriptors(sourceClass)
						.name
						.value,
				);
			const argsKeys = Object.keys(Object(args));

			// use 'argsKeys' instead of 'className' to invoke in order of keys in 'args'
			argsKeys.forEach(
				(argsKey) => {
					// only invoke constructor if 'className' is inside 'args' as a key
					if (!classNames.includes(argsKey)) {
						return;
					}

					// invoke!!!
					Object
						.defineProperties(
							this,
							Object
								.getOwnPropertyDescriptors(
									new (classes
										.filter(
											(sourceClass) => sourceClass.name === argsKey,
										)[0])(),
								),
						);
				},
			);
		}
	};

	// clone static items and items in prototype — items to be instantiated
	// (except for constructor, it is handled above)
	classes
		.forEach(
			(sourceClassItem) => {
				// clone base class & prototype separately to be able to deal with constructor
				defineClassProperties(processedTargetClass, sourceClassItem);
				defineClassProperties(processedTargetClass.prototype, sourceClassItem.prototype);
			},
		);

	return processedTargetClass;

	function defineClassProperties(
		targetClassItem: any,
		sourceClassItem: any,
	): typeof processedTargetClassItem {
		const propertyNames = Object.getOwnPropertyNames(sourceClassItem);
		const propertyDescriptors = Object.getOwnPropertyDescriptors(sourceClassItem);
		const basePropertyNames = Object.getOwnPropertyNames(class X {}).concat(['constructor']);

		const processedTargetClassItem = targetClassItem;

		propertyNames
			.forEach(
				(propertyName) => {
					// ensure it is a unique property (not 'length', 'prototype', 'name', 'constructor')
					if (basePropertyNames.includes(propertyName)) {
						return;
					}

					// define 'propertyName': 'propertyDescriptors[propertyName]'
					Object.defineProperty(
						processedTargetClassItem,
						propertyName,
						propertyDescriptors[propertyName],
					);
				},
			);

		return processedTargetClassItem;
	}
}

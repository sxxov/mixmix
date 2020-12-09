const mixmix = require('../dist/mixmix.js');

class Sand {
	static NAME = 'Sandy';
	static IS_BEACH_SAND = true;
	id = '007';
	castles = [];

	constructor(particleAmount, multiplier) {
		console.log({
			particleAmount,
			multiplier,
		})

		this.particleAmount = particleAmount * multiplier;
	}
	
    buildCastle() {
        this.castles.push('this is a castle');
    }
}

class Witch {
	static NAME = 'Weetch';
	static IS_EVIL = false;
	id = '69';
	spells = [];
	ingredients = [];

	constructor(wand, ...ingredients) {
		console.log({
			wand,
			ingredients,
		})

		this.ingredients = ingredients;
		this.wand = wand;
	}
		
    castSpell() {
        this.spells.push('this is a spell');
    }
}

test('Base class', () => {
	const MixMixed = mixmix(Sand, Witch);

	expect(MixMixed.IS_BEACH_SAND)
		.toBe(true);
	expect(MixMixed.IS_EVIL)
		.toBe(false);
	expect(MixMixed.NAME)
		.toBe('Weetch');
});

test('Prototypical mixing (Instantiation)', () => {
	const MixMixed = mixmix(Sand, Witch);
	const mixMixed = new MixMixed({
		Sand: [
			10,
			10,
		],
		Witch: [
			'Wanda',
			'Obtuse',
			'Rubber goose',
			'Green moose',
			'Guava juice',
		],
	});

	expect(mixMixed.particleAmount)
		.toBe(100);
	expect(mixMixed.wand)
		.toBe('Wanda');
	expect(mixMixed.ingredients.length)
		.toBe(4);
	expect(mixMixed.id)
		.toBe('69');
});

test('Class name', () => {
	const MixMixed = mixmix(Sand, Witch);

	expect(MixMixed.name)
		.toBe(Sand.name + Witch.name);
});

test('Override value', () => {
	const MixMixed = mixmix.withSameParamsIntoConstructors(Sand, Witch);
	const mixMixed = new MixMixed(10, 10);

	expect(mixMixed.wand)
		.toBe(10);
})

test('With constructor at index', () => {
	const MixMixed = mixmix.withConstructorAt(0, Sand, Witch);
	const mixMixed = new MixMixed();

	expect(mixMixed.id)
		.toBe('007');
})
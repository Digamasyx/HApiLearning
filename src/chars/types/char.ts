/**
 * @format
 */

export type BaseChar<T extends CharList> = {
	name: T;
	path: CharTypes<T>;
	element: Elements;
	stats: Status;
	skills: Skills;
	traces: Traces[];
	eidolons: Eidolons[];
	materials: AscMateials;
} & BaseCharIndexable;

interface BaseCharIndexable {
	[key: string]:
		| CharList
		| CharTypes<CharList>
		| Elements
		| Status
		| Skills
		| Traces[]
		| Eidolons[]
		| AscMateials;
}

export function PullData<T extends CharList>(name: T): BaseChar<T> {
	let chars = require(`./data/${name}.json`) as BaseChar<typeof name>;
	return chars;
}

export function IsInCharList(name: any): name is CharList {
	if (typeof name !== 'string') return false;

	return CharListArray.includes(name as CharList);
}

export const CharListArray: CharList[] = [
	'arlan',
	'asta',
	'bailu',
	'blade',
	'bronya',
	'clara',
	'dan_heng',
	'dan_heng_il',
	'gepard',
	'herta',
	'himeko',
	'hook',
	'jing_yuan',
	'kafka',
	'luka',
	'luocha',
	'march_7th',
	'natasha',
	'pela',
	'qingque',
	'sampo',
	'seele',
	'serval',
	'silver_wolf',
	'sushang',
	'tingyun',
	'trailblazer(physical)',
	'trailblazer(fire)',
	'welt',
	'yanqing',
	'yukong',
];
export type CharList =
	| 'arlan'
	| 'asta'
	| 'bailu'
	| 'blade'
	| 'bronya'
	| 'clara'
	| 'dan_heng'
	| 'dan_heng_il'
	| 'gepard'
	| 'herta'
	| 'himeko'
	| 'hook'
	| 'jing_yuan'
	| 'kafka'
	| 'luka'
	| 'luocha'
	| 'march_7th'
	| 'natasha'
	| 'pela'
	| 'qingque'
	| 'sampo'
	| 'seele'
	| 'serval'
	| 'silver_wolf'
	| 'sushang'
	| 'tingyun'
	| 'trailblazer(physical)'
	| 'trailblazer(fire)'
	| 'welt'
	| 'yanqing'
	| 'yukong';

export type CharTypes<T> = T extends Abundance
	? 'The Abundance'
	: T extends Destruction
	? 'The Destruction'
	: T extends Erudition
	? 'The Erudition'
	: T extends Harmony
	? 'The Harmony'
	: T extends Hunt
	? 'The Hunt'
	: T extends Nihility
	? 'The Nihility'
	: T extends Preservation
	? 'The Preservation'
	: never;

type Abundance = 'bailu' | 'natasha' | 'luocha';
type Destruction =
	| 'arlan'
	| 'hook'
	| 'clara'
	| 'trailblazer(physical)'
	| 'blade'
	| 'dan_heng_il';
type Erudition = 'herta' | 'himeko' | 'serval' | 'qingque' | 'jing_yuan';
type Harmony = 'asta' | 'bronya' | 'tingyun' | 'yukong';
type Hunt = 'dan_heng' | 'seele' | 'sushang' | 'yanqing';
type Nihility = 'pela' | 'sampo' | 'welt' | 'silver_wolf' | 'kafka' | 'luka';
type Preservation = 'gepard' | 'march_7th' | 'trailblazer(fire)';

/* Char base types */

type Elements =
	| 'Fire'
	| 'Ice'
	| 'Physical'
	| 'Lightning'
	| 'Quantum'
	| 'Imaginary';

type Status = {
	[key in StatsKeys]: {
		baseHp: number[];
		baseAtk: number[];
		baseDef: number[];
	};
} & { baseSpd: number };

type Skills = {
	[key in SkillsKeys]: {
		name: string;
		type: TypeOfActions;
		description: string;
		scalling: number[] | Scalling | Scalling[];
		tag: Tag;
		buff: {
			scalling?: number[];
			modifier?: string;
			tag: string;
		};
	};
};

type Traces = {
	traceBoost: BasicStats;
	qtd: number;
	requirement: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 75 | 80;
};

type Eidolons = {
	name: string;
	effect: string;
	scalling?: number | number[] | Scalling | Scalling[];
};

type AscMateials = {
	[key in Range<1, 7>]: {
		creditCost: number;
		material:
			| {
					name: string;
					qtd: number;
			  }
			| {
					name: string;
					qtd: number;
			  }[];
	};
};

/* Keys */

type StatsKeys = 'baseLvl' | 'maxLvl';
type SkillsKeys = 'basicAtk' | 'skill' | 'ultimate' | 'talent';

/**
 * Generates a type based on { T start index } & { K end index - 1 }
 */
type Range<T extends number, K extends number> = Exclude<
	Enumerate<K>,
	Enumerate<T>
>;

type Enumerate<
	N extends number,
	Acc extends number[] = [],
> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;

/* Non essential types */

type Scalling = {
	scalesWith: BasicStats;
	scalling: number[] | number;
	modifier?: 'flat' | 'percentage';
	maxStacks?: number;
};

type Tag =
	| 'single_target'
	| 'blast'
	| 'enhance'
	| 'restore'
	| 'defense'
	| 'aggro';

type BasicStats = 'hp' | 'def' | 'atk' | 'spd';
type TypeOfActions = 'dmg' | 'shield' | 'heal' | 'dmg_resist';

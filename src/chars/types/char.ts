/**
 * @format
 */

export interface BaseChar<T extends CharList> {
	name: T;
	path: CharTypes<T>;
}

export function PullData<T extends CharList>(name: T): BaseChar<T> {
	let chars = require(`./data/${name}.json`);
	return chars as BaseChar<typeof name>;
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

/**
 * @format
 */

import { CharList, Elements, CharPathLike, CharTypes } from './char';

export function IsInCharList(name: any): name is CharList {
	if (typeof name !== 'string') return false;

	return CharListArray.includes(name as CharList);
}

export function IsElement(obj: any): obj is Elements {
	if (typeof obj !== 'string') return false;

	return ElementsArray.includes(obj as Elements);
}

export function FileIsChar(name: any): name is CharPathLike {
	if (typeof name !== 'string') return false;

	return CharPathLikeList.includes(name as CharPathLike);
}

export function FileIsCharArray(name: any): name is CharPathLike[] {
	if (!Array.isArray(name)) return false;

	const nameSet = new Set(name);

	for (const item of nameSet) {
		if (!CharPathLikeList.includes(item)) {
			return false;
		}
	}

	return true;
}

const ElementsArray: Elements[] = [
	'Fire',
	'Ice',
	'Physical',
	'Lightning',
	'Quantum',
	'Imaginary',
];
const CharPathLikeList: CharPathLike[] = [
	'arlan.json',
	'asta.json',
	'bailu.json',
	'blade.json',
	'bronya.json',
	'clara.json',
	'dan_heng.json',
	'dan_heng_il.json',
	'gepard.json',
	'herta.json',
	'himeko.json',
	'hook.json',
	'jing_yuan.json',
	'kafka.json',
	'luka.json',
	'luocha.json',
	'march_7th.json',
	'natasha.json',
	'pela.json',
	'qingque.json',
	'sampo.json',
	'seele.json',
	'serval.json',
	'silver_wolf.json',
	'sushang.json',
	'tingyun.json',
	'trailblazer(physical).json',
	'trailblazer(fire).json',
	'welt.json',
	'yanqing.json',
	'yukong.json',
];
const CharListArray: CharList[] = [
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

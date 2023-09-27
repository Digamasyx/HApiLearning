/**
 * @format
 */

import {
	CharList,
	BaseChar,
	CharPathLike,
	PathLikeReturn,
	Elements,
	CharTypes,
} from './char';

import {
	IsElement,
	IsInCharList,
	FileIsChar,
	FileIsCharArray,
} from './typeguards';

import fs from 'fs';

import path from 'path';

export function PullData<T extends CharList>(
	name: CharPathLike<CharList>[],
): BaseChar<CharList>[];

export function PullData<T extends CharList>(
	name: CharPathLike<CharList>,
): BaseChar<T>;

export function PullData<T extends CharList>(name: T): BaseChar<T>;

export function PullData(name: CharList[]): BaseChar<CharList>[];

export function PullData<T extends CharList>(
	name: T | T[] | CharPathLike<CharList> | CharPathLike<CharList>[],
): BaseChar<T> | BaseChar<CharList>[] {
	if (Array.isArray(name)) {
		let chars: BaseChar<CharList>[] = [];
		if (FileIsCharArray(name)) {
			for (const names of name) {
				chars.push(require(`./data/${names}`));
			}
		} else {
			for (const names of name) {
				chars.push(require(`./data/${names}.json`));
			}
		}

		return chars;
	} else if (FileIsChar(name)) {
		let chars = require(`./data/${name}`) as BaseChar<T>;
		return chars;
	} else {
		let chars = require(`./data/${name}.json`) as BaseChar<T>;
		return chars;
	}
}

/**
 *
 * @param criteria
 * @param filePath The file path always points to "../chars/types/"
 */
export function FindCharsWithCriterion<T extends CharList>(
	criteria: CharTypes<T>,
	filePath: string,
): PathLikeReturn;

export function FindCharsWithCriterion(
	criteria: Elements,
	filePath: string,
): PathLikeReturn;

export function FindCharsWithCriterion<T extends CharList>(
	criteria: Elements | CharTypes<T>,
	filePath: string,
): PathLikeReturn | false {
	let matchingFiles: PathLikeReturn = { data: [], error: true };

	try {
		const folderPath = path.join(__dirname, filePath);

		const files = fs.readdirSync(folderPath);

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			const fileData = JSON.parse(
				fs.readFileSync(filePath, 'utf8'),
			) as BaseChar<CharList>;

			if (IsElement(criteria) && FileIsChar(file)) {
				if (criteria === fileData.element) matchingFiles.data.push(file);
			} else if (!IsElement(criteria) && FileIsChar(file)) {
				if (criteria === fileData.path) matchingFiles.data.push(file);
			}
		}
		if (matchingFiles.data.length === 0) return false;
	} catch (error) {
		console.error(error);
	}

	return matchingFiles;
}

import type { Dict } from "@inzero/ts-ut";

export function getDeep(obj: Record<string, any>, key: string) {
	return key.split(".").reduce((acc, cur) => acc?.[cur], obj);
}

export function setDeep(obj: Record<string, any>, key: string, value: any) {
	const keys = key.split(".");
	const lastKey = keys.pop();

	if (lastKey === undefined) return;
	if (keys.length === 0) return (obj[lastKey] = value);

	const target = keys.reduce((acc, cur) => (acc[cur] ??= {}), obj);
	target[lastKey] = value;
}

export function override<T extends Dict>(defaults: T, overrides: Partial<T>): T {
	return updateValues(defaults, (key, value) => overrides[key] ?? value) as T;
}

function updateValues(obj: Dict, fn: (key: string, value: unknown) => unknown) {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, fn(key, value)] as const),
	);
}

export function iife<R>(fn: () => R): R {
	return fn();
}

export function removeExtension(file: string) {
	return file.replace(/\.[^/.]+$/, "");
}

export function hasKey<T extends Dict, K extends string>(
	obj: T,
	key: K,
): key is Extract<keyof T, K> {
	return key in obj;
}

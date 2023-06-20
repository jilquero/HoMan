import type { Writable } from 'svelte/store';
import type { Context, User } from './types';
import { localStorageStore } from '@skeletonlabs/skeleton';

// export const warehouseStore: Writable<[] | null> = localStorageStore('warehouse', null);
export const contextStore: Writable<Context | null> = localStorageStore('context', null);
export const outputStore: Writable<string> = localStorageStore('output', 'list');
export const userStore: Writable<User | null> = localStorageStore('user', null);

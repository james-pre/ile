import type { Actions } from '@sveltejs/kit';
import { editName } from '@axium/server/web/server';

export { loadSession as load } from '@axium/server/web/server';
export const actions = { default: editName } satisfies Actions;

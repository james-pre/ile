<script lang="ts">
	import type { User } from '@axium/core/schemas';
	import { getUserImage } from '@axium/core';

	const {
		user,
		compact = false,
		self = false,
	}: {
		user: { [K in keyof User]?: User[K] | null };
		/** If true, don't show the picture */
		compact?: boolean;
		/** Whether the user is viewing their own profile */
		self?: boolean;
	} = $props();
</script>

<a class={['user', self && 'self']} href="/users/{user.id}">
	{#if !compact}
		<img src={getUserImage(user as Required<User>)} alt={user.name} />
	{/if}

	{user.name}
</a>

<style>
	.user {
		cursor: pointer;
		width: max-content;
		height: max-content;
	}

	img {
		width: 2em;
		height: 2em;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 0.5em;
	}
</style>

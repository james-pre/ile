<script lang="ts">
	import type { User } from '@axium/core/schemas';
	import { getUserImage } from '@axium/core';

	const {
		user,
		compact = false,
		self = false,
		href = `/users/${user.id}`,
	}: {
		user: { [K in keyof User]?: User[K] | null };
		/** If true, don't show the picture */
		compact?: boolean;
		/** Whether the user is viewing their own profile */
		self?: boolean;
		/** The URL to link to */
		href?: string;
	} = $props();
</script>

<a class={['user', self && 'self']} {href}>
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

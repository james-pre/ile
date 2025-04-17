<script lang="ts">
	import type { CourseShare, Permission } from '$lib/data';
	import { permissionNames } from '$lib/data';
	import type { Entries } from 'utilium';
	import User from './User.svelte';

	const { share, editable }: { share: CourseShare; editable: boolean } = $props();

	const perm = $derived(permissionNames[share.permission as Permission]);

	const permEntries = Object.entries(permissionNames) as any as Entries<typeof permissionNames>;
</script>

<div class="CourseShare">
	{#if !share.user}<i>Unknown</i>
	{:else}
		<User user={share.user} />
		{#if editable}
			<input type="hidden" name="userId" value={share.user.id} />
			<select name="permission">
				{#each permEntries as [key, name]}
					<option value={key} selected={key == share.permission}>{name}</option>
				{/each}
			</select>
		{:else}
			<span>{perm}</span>
		{/if}
	{/if}
</div>

<style>
	.CourseShare {
		display: flex;
		gap: 1em;
		padding: 1em 2em;
	}
</style>

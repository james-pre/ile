<script lang="ts">
	import Role from '$components/role.svelte';

	const { data } = $props();
	const user = data.user!;
	const viewer = data.viewer!;

	const name = viewer.roles.includes('admin') || user.settings ? user.first_name + ' ' + user.last_name : user.first_name;
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<div id="info">
	<h1>{name}</h1>

	<div id="roles">
		{#if user.id == viewer.id}
			<Role id="self" />
		{/if}

		{#each user.roles as role}
			<Role id={role} />
		{/each}
		{#if viewer.friends.includes(user.id)}
			<Role id="friend" />
		{/if}
	</div>
</div>

<style>
	#info {
		position: absolute;
		inset: 0 0 10em;
		padding: 1em 2em;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	#roles {
		display: flex;
		gap: 1em;
	}
</style>

<script lang="ts">
	import User from '$components/user.svelte';
	import Role from '$components/role.svelte';
	const { data } = $props();
	const user = data.user!;
	const viewer = data.viewer!;

	const name = viewer.roles.includes('admin') || user.settings ? user.first_name + ' ' + user.last_name : user.first_name;
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<User user={viewer} self />

<div id="info">
	<h1>{name}</h1>

	<div id="roles">
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
		position: fixed;
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

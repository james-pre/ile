<script lang="ts">
	import Role from '$components/Role.svelte';
	const { data } = $props();

	const { user, viewing } = data;
</script>

<svelte:head>
	<title>{viewing!.name}</title>
</svelte:head>

<div id="info">
	<h1>{viewing!.name}</h1>

	<div id="roles">
		{#if user?.id == viewing!.id}
			<Role id="self" />
		{/if}

		{#each viewing!.preferences._roles as id}
			<Role {id} />
		{/each}
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

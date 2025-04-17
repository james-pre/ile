<script lang="ts">
	import User from '$components/User.svelte';

	const { data } = $props();

	const { user, friends } = data;
</script>

<svelte:head>
	<title>Your Courses</title>
</svelte:head>

<div class="header">
	<h1>Your Friends</h1>
</div>

{#if user}
	<div id="friends" class="content">
		{#each friends as friend}
			<User user={friend} />
		{/each}
	</div>
{:else}
	<div class="content">
		<p>You need to sign in to view friends</p>
	</div>
{/if}

<style>
	:global(.user:not(.self)) {
		display: flex;
		align-items: center;
		gap: 0.5em;
		border-radius: 0.5em;
		cursor: pointer;
		border: 1px solid #9999;
		padding: 1em 2em;
	}

	:global(.user:not(.self):hover) {
		background: #222;
	}
</style>

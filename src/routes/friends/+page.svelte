<script lang="ts">
	import User from '$components/user.svelte';
	import * as demo from '$lib/demo.js';
	import { Access } from '$lib/data.js';

	const { data } = $props();
	const { user } = data;

	function __get_user(id: string) {
		if (id in demo.users) return demo.users[id as keyof typeof demo.users];
		throw new Error('User not found: ' + id);
	}
</script>

<svelte:head>
	<title>Your Courses</title>
</svelte:head>

<div class="header">
	<h1>Your Friends</h1>
</div>

<div id="friends" class="content">
	{#each user.friends as friend}
		<User user={__get_user(friend)} access={Access.Friend} />
	{/each}
</div>

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

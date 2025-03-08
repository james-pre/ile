<script lang="ts">
	import User from '$components/user.svelte';

	const { children, data } = $props();
	const { user } = data;
</script>

<nav>
	<a href="/courses">Courses</a>
	<a href="/friends">Friends</a>
</nav>

<User {user} self />

{@render children()}

<style>
	nav {
		display: flex;
		gap: 1em;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 3em;
		padding: 1em 2em;
		background: #222225;
		border-bottom: 1px solid #445;
		align-items: center;
	}

	:global(body) {
		background: #111;
		color: #ccc;
		inset: 3em 0 0;
		position: fixed;
		margin: 0;
		padding: 1em 0 0;
	}

	:global(.user.self) {
		position: fixed;
		right: 1em;
		top: 0.5em;
		padding-bottom: 1em;
		z-index: 10;
	}
</style>

<script lang="ts">
	import User from '$components/user.svelte';
	import { settings } from '$lib/settings.js';

	const { data } = $props();
	const { user } = data;
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<User {user} self />

<div id="header">
	<h1>Settings</h1>
</div>

<div id="settings">
	{#each settings as setting}
		<div class="setting">
			<label for={setting.id}>{setting.label}</label>
			<input
				{...setting}
				onchange={e => {
					user.settings[setting.id] = setting.type == 'checkbox' ? e.currentTarget.checked : (e.currentTarget.value as never);
				}}
			/>
		</div>
	{/each}
</div>

<style>
	#header {
		position: fixed;
		inset: 0 0 10em;
		padding: 1em 2em;
	}

	#settings {
		position: fixed;
		inset: 10em 10em 0;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.setting {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5em;
		border-radius: 0.5em;
		cursor: pointer;
		border: 1px solid #9999;
		padding: 1em 2em;
	}
</style>

<script lang="ts">
	import { settings } from '$lib/settings.js';
	import Icon from '$components/icon.svelte';
	const { data } = $props();
	const { user } = data;
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="header">
	<h1>Settings</h1>
</div>

<div id="settings" class="content">
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

	<a href="/signout">
		<div class="button">
			<Icon name="signout" />
			Sign out
		</div>
	</a>
</div>

<style>
	.setting {
		display: flex;
		align-items: center;
		padding: 1em 2em;
		gap: 0.5em;
		justify-content: space-between;
		border-radius: 0.5em;
		cursor: pointer;
		border: 1px solid #9999;
	}
</style>

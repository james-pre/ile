<script lang="ts">
	import { enhance } from '$app/forms';
	import { settings } from '$lib/settings.js';
	import '@axium/server/web/lib/styles.css';
	import Account from '@axium/server/web/routes/+page.svelte';

	const props = $props();
	const { user } = props.data;
</script>

<svelte:head>
	<title>Account</title>
</svelte:head>

<Account {...props}>
	<div class="account-section main">
		<form use:enhance action="?/setting">
			{#each settings as setting}
				<div class="setting account-item">
					<label for={setting.id}>{setting.label}</label>
					<input
						{...setting}
						onchange={e => {
							user.preferences[setting.id] = setting.type == 'checkbox' ? e.currentTarget.checked : (e.currentTarget.value as never);
						}}
					/>
				</div>
			{/each}
		</form>
	</div>
</Account>

<style>
	form {
		display: contents;
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { userSettings } from '$lib/settings.js';
	import { Account, Icon } from '@axium/server/web';
	import '@axium/server/web/lib/styles.css';
	import '@axium/server/web/lib/account.css';

	const { data, form } = $props();
</script>

<svelte:head>
	<title>Account</title>
</svelte:head>

<Account {data}>
	<div class="account-section main">
		<form use:enhance action="?/settings" method="post">
			{#if form?.error}
				<div class="error">{form.error}</div>
			{/if}
			{#if form?.success}
				<div class="success">{form.success}</div>
			{/if}
			{#each userSettings as setting}
				<div class="setting account-item">
					<label for={setting.id}>{setting.label}</label>
					<input
						{...setting}
						onchange={e => {
							data.user!.preferences[setting.id] = setting.type == 'checkbox' ? e.currentTarget.checked : (e.currentTarget.value as never);
						}}
					/>
				</div>
			{/each}
			<button type="submit">
				<Icon id="check" />
				Save
			</button>
		</form>
	</div>
</Account>

<style>
	form {
		display: contents;
	}
</style>

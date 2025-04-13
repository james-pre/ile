<script lang="ts">
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
	<div class="acccount-section main">
		{#each settings as setting}
			<div class="setting">
				<label for={setting.id}>{setting.label}</label>
				<input
					{...setting}
					onchange={e => {
						user.preferences[setting.id] = setting.type == 'checkbox' ? e.currentTarget.checked : (e.currentTarget.value as never);
					}}
				/>
			</div>
		{/each}
	</div>
</Account>

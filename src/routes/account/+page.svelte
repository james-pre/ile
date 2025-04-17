<script lang="ts">
	import { enhance } from '$app/forms';
	import { userSettings } from '$lib/settings.js';
	import { Account } from '@axium/server/web';
	import '@axium/server/web/lib/account.css';
	import '@axium/server/web/lib/styles.css';

	const { data, form } = $props();

	const settings = data.user!.preferences;

	let saved = $state(false);

	const classes = $derived(saved ? ['saved'] : []);

	$effect(() => {
		if (form?.success && form.settings) saved = true;
		setTimeout(() => {
			saved = false;
		}, 8_000);
	});
</script>

<Account {data} {form}>
	<div class="account-section main">
		<form
			action="?/settings"
			method="post"
			use:enhance={() =>
				async ({ update }) =>
					update({ reset: false })}
		>
			{#if form?.error}
				<div class="error">{form.error}</div>
			{/if}
			{#each userSettings as setting}
				<div class="setting account-item">
					<label for={setting.name}>{setting.label}</label>
					{#if setting.type == 'checkbox'}
						<input type="hidden" name={setting.name} value="false" />
						<input {...setting} value="true" {...settings[setting.name] ? { checked: true } : {}} />
					{:else}
						<input {...setting} value={settings[setting.name]} />
					{/if}
				</div>
			{/each}
			<button type="submit" class={classes} disabled={saved}>Save</button>
		</form>
	</div>
</Account>

<style>
	form {
		display: contents;
	}

	@keyframes success {
		0% {
			background-color: #222;
		}
		100% {
			background-color: #3737;
		}
	}

	form button.saved {
		animation: success 2s ease 0s 2 alternate both;
	}
</style>

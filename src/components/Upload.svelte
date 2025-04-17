<script lang="ts">
	import { Icon } from '@axium/server/web';
	import { resourceInfo } from '$lib/data';

	let { files = $bindable() }: { files?: FileList } = $props();

	// Note: only use when files have been uploaded
	const info = $derived(files?.length ? resourceInfo(files[0].type) : null)!;

	let input = $state<HTMLInputElement>()!;

	function remove(e: MouseEvent) {
		e.preventDefault();
		input.value = '';
	}
</script>

<div>
	{#if files?.length}
		<label for="content">
			<Icon i={info.icon} />
			{files[0].name}
			<button onclick={remove}><Icon i="trash" /></button>
		</label>
	{:else}
		<label for="content"><Icon i="upload" />Upload</label>
	{/if}

	<input bind:this={input} name="content" type="file" required bind:files style:opacity="0" />
</div>

<style>
	label {
		padding: 0.5em 1em;
		border: 1px solid #cccc;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5em;
		border-radius: 0.5em;
	}
</style>

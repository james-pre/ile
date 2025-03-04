<script lang="ts">
	import Icon from './icon.svelte';

	export type Kind = 'generic' | 'plain' | 'document' | 'audio' | 'video' | 'website';

	export interface ResourceInfo {
		kind: Kind;
		title: string;
		contents: string;
		selected?: boolean;
	}

	let { kind = 'generic', title = '' }: any = $props();

	const id = Date.now() + Math.random().toString(36).substring(2, 15);
</script>

<div {id}>
	<Icon name={kind} />
	{title}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 0.5em;
		border-radius: 0.5em;
		cursor: pointer;
		border: 1px solid transparent;
		padding: 0.25em 0.75em 0.25em 0.5em;
	}

	:hover {
		background: #222;
	}
</style>

<script lang="ts">
	import paths from './icon-paths.json' with { type: 'json' };

	interface Props {
		name: string;
		bg?: string;
		fg?: string;
		size?: number;
	}

	let { name = 'generic', bg = 'var(--icon-bg)', fg = 'var(--icon-fg)', size = 24 }: Props = $props();
</script>

{#if name in paths}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size - 4} height={size - 4}>
		<path d={paths[name as keyof typeof paths]} fill={fg} />
	</svg>
{:else}
	<svg viewBox="0 0 24 24" width={size} height={size}>
		{#if name == 'plain'}
			<rect x="4" y="2" width="16" height="20" rx="2" ry="2" fill={bg} />
			<rect x="7" y="6" width="10" height="1" rx="0.5" fill={fg} />
			<rect x="7" y="9" width="10" height="1" rx="0.5" fill={fg} />
			<rect x="7" y="12" width="10" height="1" rx="0.5" fill={fg} />
			<rect x="7" y="15" width="7" height="1" rx="0.5" fill={fg} />
		{:else if name == 'document'}
			<path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z" fill={bg} />
			<path d="M14,8V2.5L19.5,8H14z" fill={fg} />
			<rect x="6" y="12" width="12" height="1" rx="0.5" fill={fg} />
			<rect x="6" y="15" width="12" height="1" rx="0.5" fill={fg} />
			<rect x="6" y="18" width="8" height="1" rx="0.5" fill={fg} />
		{:else if name == 'audio'}
			<rect x="2" y="4" width="20" height="16" rx="2" ry="2" fill={bg} />
			<polygon points="10,8 16,12 10,16" fill={fg} />
		{:else if name == 'video'}
			<rect x="2" y="4" width="20" height="16" rx="2" ry="2" fill={bg} />
			<polygon points="10,8 16,12 10,16" fill={fg} />
		{:else if name == 'resources'}
			<rect x="3" y="2" width="18" height="20" rx="2" ry="2" fill={bg} />
			<rect x="5" y="5" width="14" height="2" rx="1" fill={fg} />
			<rect x="5" y="9" width="14" height="2" rx="1" fill={fg} />
			<rect x="5" y="13" width="14" height="2" rx="1" fill={fg} />
			<rect x="5" y="17" width="10" height="2" rx="1" fill={fg} />
		{:else if name == 'cubes'}
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill={bg} />
			<rect x="6" y="6" width="5" height="5" rx="1" fill={fg} />
			<rect x="13" y="6" width="5" height="5" rx="1" fill={fg} />
			<rect x="6" y="13" width="5" height="5" rx="1" fill={fg} />
			<rect x="13" y="13" width="5" height="5" rx="1" fill={fg} />
		{:else}
			<path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z" fill={bg} />
			<path d="M14,8V2.5L19.5,8H14z" fill={fg} />
		{/if}
	</svg>
{/if}

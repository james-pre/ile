<script lang="ts">
	interface Props {
		name: string;
		bg?: string;
		fg?: string;
		size?: number;
	}

	let { name = 'generic', bg = 'var(--icon-bg)', fg = 'var(--icon-fg)', size = 24 }: Props = $props();
</script>

{#if name == 'website'}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size - 4} height={size - 4}>
		<path
			d="M256 480c16.7 0 40.4-14.4 61.9-57.3c9.9-19.8 18.2-43.7 24.1-70.7l-172 0c5.9 27 14.2 50.9 24.1 70.7C215.6 465.6 239.3 480 256 480zM164.3 320l183.4 0c2.8-20.2 4.3-41.7 4.3-64s-1.5-43.8-4.3-64l-183.4 0c-2.8 20.2-4.3 41.7-4.3 64s1.5 43.8 4.3 64zM170 160l172 0c-5.9-27-14.2-50.9-24.1-70.7C296.4 46.4 272.7 32 256 32s-40.4 14.4-61.9 57.3C184.2 109.1 175.9 133 170 160zm210 32c2.6 20.5 4 41.9 4 64s-1.4 43.5-4 64l90.8 0c6-20.3 9.3-41.8 9.3-64s-3.2-43.7-9.3-64L380 192zm78.5-32c-25.9-54.5-73.1-96.9-130.9-116.3c21 28.3 37.6 68.8 47.2 116.3l83.8 0zm-321.1 0c9.6-47.6 26.2-88 47.2-116.3C126.7 63.1 79.4 105.5 53.6 160l83.7 0zm-96 32c-6 20.3-9.3 41.8-9.3 64s3.2 43.7 9.3 64l90.8 0c-2.6-20.5-4-41.9-4-64s1.4-43.5 4-64l-90.8 0zM327.5 468.3c57.8-19.5 105-61.8 130.9-116.3l-83.8 0c-9.6 47.6-26.2 88-47.2 116.3zm-143 0c-21-28.3-37.5-68.8-47.2-116.3l-83.7 0c25.9 54.5 73.1 96.9 130.9 116.3zM256 512A256 256 0 1 1 256 0a256 256 0 1 1 0 512z"
			fill={fg}
		/>
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

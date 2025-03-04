<script lang="ts">
	import { parse as parseMD } from 'marked';
	import type { ResourceInfo } from '$lib/resource';

	const { kind, title, contents, active }: ResourceInfo & { active: boolean } = $props();
</script>

<div style:display={active ? 'block' : 'none'}>
	{#if kind === 'generic'}
		<a href={contents} download={title}>{title}</a>
	{:else if kind == 'plain'}
		<p contenteditable="true" style:outline="none">
			{@html contents
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace('>', '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#x27;')
				.replace(/\//g, '&#x2F;')
				.replace(/\n/g, '<br>')}
		</p>
	{:else if kind == 'document'}
		<div style:line-height="1.6" style:margin-bottom="1em">{@html parseMD(contents, { async: false })}</div>
	{:else if kind == 'audio'}
		<audio src={contents} controls></audio>
	{:else if kind == 'video'}
		<video src={contents} controls>
			<track kind="captions" />
		</video>
	{:else if kind == 'website'}
		<iframe src={contents} width="100%" height="100%" style:border="1px solid #5555" {title}></iframe>
	{/if}
</div>

<style>
	div {
		height: 100%;
	}
</style>

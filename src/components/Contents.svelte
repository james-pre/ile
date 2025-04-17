<script lang="ts">
	import { parse as parseMD } from 'marked';
	import { resourceURL, type Resource_S } from '$lib/data.js';

	const { kind, title, active, content }: Resource_S & { active: boolean } = $props();
</script>

<div style:display={active ? 'block' : 'none'} style:height="100%">
	{#if kind === 'generic'}
		<a href={content} download={title}>{title}</a>
	{:else if kind == 'plain'}
		<p contenteditable="true" style:outline="none">
			{@html content
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace('>', '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#x27;')
				.replace(/\//g, '&#x2F;')
				.replace(/\n/g, '<br>')}
		</p>
	{:else if kind == 'document'}
		<div style:line-height="1.6" style:margin-bottom="1em">{@html parseMD(content, { async: false })}</div>
	{:else if kind == 'audio'}
		<audio src={resourceURL(content)} controls></audio>
	{:else if kind == 'video'}
		<video src={resourceURL(content)} controls>
			<track kind="captions" />
		</video>
	{:else if kind == 'website'}
		<iframe src={content} width="100%" height="100%" style:border="1px solid #5555" {title}></iframe>
	{/if}
</div>

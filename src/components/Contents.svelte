<script lang="ts">
	import { parse as parseMD } from 'marked';
	import { resourceURL, type Resource_S } from '$lib/data.js';

	const { type, name, active, content }: Resource_S & { active: boolean } = $props();
</script>

<div style:display={active ? 'block' : 'none'} style:height="100%">
	{#if type == 'text/plain'}
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
	{:else if type == 'text/markdown'}
		<div style:line-height="1.6" style:margin-bottom="1em">{@html parseMD(content, { async: false })}</div>
	{:else if type == 'audio'}
		<audio src={resourceURL(content)} controls></audio>
	{:else if type == 'video'}
		<video src={resourceURL(content)} controls>
			<track kind="captions" />
		</video>
	{:else if type == 'website'}
		<iframe src={content} width="100%" height="100%" style:border="1px solid #5555" title={name}></iframe>
	{:else}
		<a href={content} download={name}>{name}</a>
	{/if}
</div>

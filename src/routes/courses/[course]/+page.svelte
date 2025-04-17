<script lang="ts">
	import Contents from '$components/Contents.svelte';
	import Upload from '$components/Upload.svelte';
	import { resourceInfo } from '$lib/data.js';
	import { FormDialog, Icon } from '@axium/server/web';

	const { data, form } = $props();
	const course = $derived(data.course);

	let activeSidebarTab = $state('resources');

	let activeItemID: string | undefined = $state();

	let addingResource = $state(false);
	let uploading = $state(false);
</script>

<svelte:head>
	<title>{course.name}</title>
</svelte:head>

{#snippet sidebar_tab_icon(name: string, icon: string)}
	<div class={[name, activeSidebarTab == name && 'active']} onclick={() => (activeSidebarTab = name)}>
		<Icon i={icon} --size="2em" />
	</div>
{/snippet}

<div id="app">
	<div id="sidebar">
		<div id="sidebar-tabs">
			{@render sidebar_tab_icon('resources', 'books')}
			{@render sidebar_tab_icon('projects', 'grid-2')}
		</div>

		<div class="section" id="projects" style:display={activeSidebarTab == 'projects' ? 'flex' : 'none'}>
			<i>Projects aren't supported yet. We're working on it!</i>
			{#each course.projects as project}
				<div class={['project', activeItemID === project.id && 'selected']} onclick={() => (activeItemID = project.id)}>{project.title}</div>
			{/each}
		</div>

		<div class="section" id="resources" style:display={activeSidebarTab == 'resources' ? 'flex' : 'none'}>
			{#each course.resources as resource}
				<div class={['resource', activeItemID === resource.id && 'selected']} onclick={() => (activeItemID = resource.id)}>
					<Icon i={resourceInfo(resource.type).icon} />
					{resource.name}
				</div>
			{/each}
			<div class="footer">
				<button class="upload" onclick={() => (uploading = true)}><Icon i="upload" />Upload</button>
				<button class="add" onclick={() => (addingResource = true)}><Icon i="plus" />Add</button>
			</div>
		</div>
	</div>

	<div id="content">
		{#each course.resources as resource}
			<Contents {...resource} active={activeItemID === resource.id} />
		{/each}

		<div id="content-default" style:display="flex" style:align-items="center" style:justify-content="center" style:height="100%" style:color="#aaaa">
			<p>Open a resource to get started</p>
		</div>
	</div>
</div>

<a href="/courses">
	<button id="back"><Icon i="arrow-left-from-bracket" />Back to courses</button>
</a>

<!-- For files -->
<FormDialog bind:active={uploading} {form} submitText="Upload" action="?/upload_resource">
	<Upload />
</FormDialog>

<!-- For text -->
<FormDialog bind:active={addingResource} {form} submitText="Add" action="?/add_resource">
	<div>
		<label for="name">Name</label>
		<input name="name" type="text" required />
	</div>
	<div>
		<label for="kind">Type</label>
		<select name="kind" required>
			<option value="text">Text</option>
			<option value="markdown">Markdown</option>
			<option value="url">URL / Link</option>
		</select>
	</div>
	<div>
		<label for="content">Content</label>
		<textarea name="content" required></textarea>
	</div>
</FormDialog>

<style>
	textarea {
		resize: vertical;
	}

	#app {
		position: absolute;
		inset: 0;
		display: grid;
		grid-template-columns: max-content 1fr;
	}

	#sidebar {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		grid-column: 1;
		border-right: 1px solid #333;
		min-width: 200px;
		width: max-content;
		height: 100%;
		text-wrap: balance;
		overflow: hidden;
		resize: horizontal;

		.section {
			padding: 0 1em;
		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1.5em;
			gap: 1em;
			width: max-content;

			button {
				width: max-content;
			}
		}
	}

	#sidebar-tabs {
		display: flex;
		gap: 0.5em;
		border-bottom: 1px solid #333;
		width: 100%;
		overflow-x: scroll;

		div {
			color: #ccc;
			width: 3.5em;
			height: 3.5em;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			padding: 0.5em;
		}

		div:hover {
			background: #333;
		}

		.active {
			border-bottom: 2px solid #ccc;
		}
	}

	#resources {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	#content {
		grid-column: 2;
		overflow: scroll;
		margin: 1em;
	}

	.resource {
		display: flex;
		align-items: center;
		gap: 0.5em;
		border-radius: 0.5em;
		cursor: pointer;
		border: 1px solid transparent;
		padding: 0.25em 0.75em 0.25em 0.5em;
	}

	.resource:hover {
		background: #222;
	}

	.resource.selected {
		border: 1px solid #555;
		background: #334;
		color: #fff;
	}

	#back {
		position: fixed;
		bottom: 1em;
		left: 1em;
	}
</style>

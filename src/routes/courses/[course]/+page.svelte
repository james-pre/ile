<script lang="ts">
	import Contents from '$components/contents.svelte';
	import { Icon } from '@axium/server/web';
	import { resourceIcons, type Course } from '$lib/data.js';

	const { data } = $props();

	const { name, resources, projects } = data.course as Course;

	let activeSidebarTab = $state('resources');

	let activeItemID: string | undefined = $state();
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

{#snippet sidebar_tab_icon(name: string, icon: string)}
	<div class={[name, activeSidebarTab == name && 'active']} onclick={() => (activeSidebarTab = name)}>
		<Icon id={icon} --size="2em" />
	</div>
{/snippet}

<div id="app">
	<div id="sidebar">
		<div id="sidebar-tabs">
			{@render sidebar_tab_icon('resources', 'books')}
			{@render sidebar_tab_icon('projects', 'grid-2')}
		</div>

		<div class="main" id="projects" style:display={activeSidebarTab == 'projects' ? 'flex' : 'none'}>
			{#each projects as project}
				<div class={['project', activeItemID === project.id && 'selected']} onclick={() => (activeItemID = project.id)}>
					{project.title}
				</div>
			{/each}
		</div>

		<div class="main" id="resources" style:display={activeSidebarTab == 'resources' ? 'flex' : 'none'}>
			{#each resources as resource}
				<div class={['resource', activeItemID === resource.id && 'selected']} onclick={() => (activeItemID = resource.id)}>
					<Icon id={resourceIcons[resource.kind]} />
					{resource.title}
				</div>
			{/each}
			<div class="footer">
				<button class="add">
					<Icon id="plus" />
					Add
				</button>
			</div>
		</div>
	</div>

	<!-- Main content area -->
	<div id="content">
		{#each resources as resource}
			<Contents {...resource} active={activeItemID === resource.id} />
		{/each}

		<div id="content-default" style:display="flex" style:align-items="center" style:justify-content="center" style:height="100%" style:color="#aaaa">
			<p>Open a resource to get started</p>
		</div>
	</div>
</div>

<a href="/courses">
	<button id="back"> ← Back to courses </button>
</a>

<style>
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

		.main {
			padding: 0 1em;
		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1.5em;
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

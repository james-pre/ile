<script lang="ts">
	import Contents from '$components/contents.svelte';
	import Icon from '$components/icon.svelte';
	import type { ResourceInfo } from '$lib/resource.js';

	const { data } = $props();
	const { course, resources } = data;

	let activeSidebar = $state('resources');

	let activeResourceID: string | undefined = $state();
</script>

<div id="app">
	<div id="sidebar">
		<div id="sidebar-menu">
			<div class={['resources', activeSidebar == 'resources' && 'active']} onclick={() => (activeSidebar = 'resources')}>
				<Icon name="resources" size={32} />
			</div>
			<div class={['projects', activeSidebar == 'projects' && 'active']} onclick={() => (activeSidebar = 'projects')}>
				<Icon name="cubes" size={32} />
			</div>
		</div>

		<div class="main" id="projects" style:display={activeSidebar == 'projects' ? 'flex' : 'none'}>
			<p>Your project workspace will appear here.</p>
		</div>

		<!-- Sidebar for list of resources -->
		<div class="main" id="resources" style:display={activeSidebar == 'resources' ? 'flex' : 'none'}>
			{#each resources as resource}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div class={['resource', activeResourceID === resource.id && 'selected']} onclick={() => (activeResourceID = resource.id)}>
					<Icon name={resource.kind} />
					{resource.title}
				</div>
			{/each}
			<div class="footer">
				<button class="add">+ Add</button>
			</div>
		</div>
	</div>

	<!-- Main content area -->
	<div id="content">
		{#each resources as resource}
			<Contents {...resource} active={activeResourceID === resource.id} />
		{/each}

		<div id="content-default" style:display="flex" style:align-items="center" style:justify-content="center" style:height="100%" style:color="#aaaa">
			<p>Open a resource to get started</p>
		</div>
	</div>
</div>

<p id="debug-course">{course}</p>

<style>
	#debug-course {
		position: fixed;
		bottom: 1em;
		right: 1em;
		color: #baa;
		width: max-content;
	}

	#app {
		background: #111;
		color: #ccc;
		inset: 0;
		position: fixed;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: max-content 1fr;
	}

	#sidebar {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		grid-column: 1;
		background: #111;
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
				padding: 0.5em 2em;
				background: #222;
				border: 1px solid #445;
				border-radius: 0.5em;
				color: #ccc;
				width: max-content;
				cursor: pointer;
			}

			button:hover {
				background: #335;
			}
		}
	}

	#sidebar-menu {
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

		.header {
			margin-bottom: 1.5em;
			border-bottom: 1px solid #333;
			padding-bottom: 0.5em;

			h1 {
				font-size: 1.8em;
				color: #fff;
				margin-bottom: 0.5em;
				display: flex;
				align-items: center;
				gap: 0.5em;
			}
		}
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
</style>

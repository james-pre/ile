<script lang="ts">
	import Resource, { type ResourceInfo } from '$components/resource.svelte';
	import Contents from '$components/contents.svelte';

	const { data } = $props();
	const { course, resources } = data;

	let active = $state('resources');

	let activeResource: ResourceInfo | null = $state(null);
</script>

<div id="app">
	<div id="sidebar">
		<div id="sidebar-menu">
			<div class={['resources', active == 'resources' && 'active']} onclick={() => (active = 'resources')}>
				<svg viewBox="0 0 24 24">
					<rect x="3" y="2" width="18" height="20" rx="2" ry="2" fill="var(--icon-bg)" />
					<rect x="5" y="5" width="14" height="2" rx="1" fill="var(--icon-fg)" />
					<rect x="5" y="9" width="14" height="2" rx="1" fill="var(--icon-fg)" />
					<rect x="5" y="13" width="14" height="2" rx="1" fill="var(--icon-fg)" />
					<rect x="5" y="17" width="10" height="2" rx="1" fill="var(--icon-fg)" />
				</svg>
			</div>
			<div class={['projects', active == 'projects' && 'active']} onclick={() => (active = 'projects')}>
				<svg viewBox="0 0 24 24">
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="var(--icon-bg)" />
					<rect x="6" y="6" width="5" height="5" rx="1" fill="var(--icon-fg)" />
					<rect x="13" y="6" width="5" height="5" rx="1" fill="var(--icon-fg)" />
					<rect x="6" y="13" width="5" height="5" rx="1" fill="var(--icon-fg)" />
					<rect x="13" y="13" width="5" height="5" rx="1" fill="var(--icon-fg)" />
				</svg>
			</div>
		</div>

		<div class="main" id="projects" style:display={active == 'projects' ? 'flex' : 'none'}>
			<p>Your project workspace will appear here.</p>
		</div>

		<!-- Sidebar for list of resources -->
		<div class="main" id="resources" style:display={active == 'resources' ? 'flex' : 'none'}>
			{#each resources as resource}
				<Resource onclick={() => (activeResource = resource)} {...resource} class={[activeResource == resource && 'selected']} />
			{/each}
			<div class="footer">
				<button class="add">+ Add</button>
			</div>
		</div>
	</div>

	<!-- Main content area -->
	<div id="content">
		{#if activeResource}
			<Contents {...activeResource} />
		{:else}
			<div id="content-default" style:display="flex" style:align-items="center" style:justify-content="center" style:height="100%" style:color="#aaaa">
				<p>Open a resource to get started</p>
			</div>
		{/if}
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

	.selected {
		border: 1px solid #555;
		background: #334;
		color: #fff;
	}
</style>

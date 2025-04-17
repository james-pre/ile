<script lang="ts">
	import Contents from '$components/Contents.svelte';
	import '$lib/app.css';
	import { resourceIcons } from '$lib/data.js';
	import { Icon } from '@axium/server/web';

	const { data } = $props();
	const course = data.course!;

	let activeSidebarTab = $state('resources');

	let activeItemID: string | undefined = $state();
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
			{#each course.projects ?? [] as project}
				<div class={['project', activeItemID === project.id && 'selected']} onclick={() => (activeItemID = project.id)}>
					{project.title}
				</div>
			{/each}
		</div>

		<div class="section" id="resources" style:display={activeSidebarTab == 'resources' ? 'flex' : 'none'}>
			{#each course.resources ?? [] as resource}
				<div class={['resource', activeItemID === resource.id && 'selected']} onclick={() => (activeItemID = resource.id)}>
					<Icon i={resourceIcons[resource.kind]} />
					{resource.title}
				</div>
			{/each}
			<div class="footer">
				<button class="add"><Icon i="plus" />Add</button>
			</div>
		</div>
	</div>

	<div id="content">
		{#each course.resources ?? [] as resource}
			<Contents {...resource} active={activeItemID === resource.id} />
		{/each}

		<div id="content-default" style:display="flex" style:align-items="center" style:justify-content="center" style:height="100%" style:color="#aaaa">
			<p>Open a resource to get started</p>
		</div>
	</div>
</div>

<a href="/courses">
	<button id="back"> <Icon i="arrow-left-from-bracket" /> Back to courses </button>
</a>

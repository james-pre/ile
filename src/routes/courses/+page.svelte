<script lang="ts">
	import { enhance } from '$app/forms';
	import Dialog from '$components/dialog.svelte';
	import type { Course } from '$lib/data.js';
	import { Icon } from '@axium/server/web';

	const { form, data } = $props();

	let showCreate = $state(false);
	let removing: Course | null = $state(null);
	let showRemove = $derived(!!removing);

	$effect(() => {
		if (!form?.success) return;
		showCreate = false;
		removing = null;
	});
</script>

<svelte:head>
	<title>Your Courses</title>
</svelte:head>

<div class="header">
	<h1>Your Courses</h1>
</div>

<div id="courses" class="content">
	{#each data.courses as course}
		<div class="course">
			<a href="/courses/{course.id}">{course.name}</a>
			<div class="course-remove" onclick={() => (removing = course)}><Icon i="trash" /></div>
		</div>
	{/each}

	{#if !data.courses.length}
		<p>You don't have any courses yet.</p>
	{/if}

	<div class="button" onclick={() => (showCreate = true)}><Icon i="plus" />New Course</div>
</div>

<Dialog bind:show={showRemove}>
	<form method="POST" action="?/remove" use:enhance>
		{#if form?.error}
			<div class="error">{form.error}</div>
		{/if}
		<p>
			Are you sure you want to delete <strong>{removing?.name}</strong>? This action cannot be undone.
			<br />
			Deleting a course will remove all of its contents, including any projects and resources.
		</p>
		<input type="hidden" name="id" id="course-id" value={removing?.id} />
		<div class="actions">
			<button
				type="button"
				onclick={e => {
					e.preventDefault();
					removing = null;
				}}>Cancel</button
			>
			<button type="submit" class="delete">Delete</button>
		</div>
	</form>
</Dialog>

<Dialog bind:show={showCreate}>
	<form class="main" method="POST" action="?/create" use:enhance>
		{#if form?.error}
			<div class="error">{form.error}</div>
		{/if}
		<div>
			<label for="name">Course Name</label>
			<input id="name" name="name" type="text" />
		</div>
		<div class="actions">
			<button
				class="cancel"
				onclick={e => {
					e.preventDefault();
					showCreate = false;
				}}>Cancel</button
			>
			<button class="create" type="submit">Create</button>
		</div>
	</form>
</Dialog>

<style>
	.course {
		display: grid;
		grid-template-columns: 1fr 2em;
		align-items: center;
		gap: 0.5em;
		border-radius: 0.5em;
		border: 1px solid #9999;
		padding: 1em 2em;
	}

	.course:hover {
		background: #334;
	}

	.actions {
		display: flex;
		gap: 1em;
		flex-direction: row;
		justify-content: space-between;
	}

	.course-remove {
		cursor: pointer;
	}

	.delete {
		background: #733;
	}
</style>

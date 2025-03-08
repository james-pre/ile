<script lang="ts">
	import Icon from '$components/icon.svelte';

	const { data } = $props();
	const { courses } = data;
</script>

<svelte:head>
	<title>Your Courses</title>
</svelte:head>

<div class="header">
	<h1>Your Courses</h1>
</div>

<div id="courses" class="content">
	{#each courses as course}
		<a href="/courses/{course.id}">
			<div class="course">
				{course.name}
			</div>
		</a>
	{/each}

	<div class="button">
		<Icon name="plus" />
		New Course
	</div>
</div>

<style>
	.course {
		display: flex;
		align-items: center;
		gap: 0.5em;
		border-radius: 0.5em;
		cursor: pointer;
		border: 1px solid #9999;
		padding: 1em 2em;
	}

	.course:hover {
		background: #222;
	}
</style>

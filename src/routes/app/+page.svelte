<script lang="ts">
	const { data } = $props();
	const { user, courses } = data;
</script>

<svelte:head>
	<title>Your Courses</title>
</svelte:head>

<div id="header">
	<h1>Your Courses</h1>
</div>

<div id="courses">
	{#each courses as course}
		<div class="course" onclick={() => (window.location.href = '/app/' + course.id)}>
			{course.name}
		</div>
	{/each}
</div>

<style>
	#header {
		position: fixed;
		inset: 0 0 10em;
		padding: 1em 2em;
	}

	#courses {
		position: fixed;
		inset: 10em 10em 0;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

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

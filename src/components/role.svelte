<script lang="ts">
	let { id }: { id: string } = $props();

	const roles = {
		admin: ['Administrator', '#910'],
		friend: ['Your Friend', '#696'],
		self: ['You', '#235'],
	};

	const [name, color] = roles[id as keyof typeof roles] || [id, '#777'];
</script>

<div class="role" style:background={color}>
	{name}
</div>

<style>
	.role {
		padding: 0.25em 0.75em;
		border-radius: 1em;
	}
</style>

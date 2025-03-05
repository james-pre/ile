<script lang="ts">
	import { Access, type User } from '$lib/data';

	const {
		user,
		access = Access.Public,
		compact = false,
		menu = false,
		self = false,
	}: {
		user: User;
		access?: Access;
		/** If true, don't show the picture */
		compact?: boolean;
		/** If true, the menu can be opened */
		menu?: 'hover' | 'click' | false;
		/** Whether the user is viewing their own profile */
		self?: boolean;
	} = $props();

	let menuVisible = $state(false);

	const visibility = $derived(menu != 'click' ? null : menuVisible ? 'flex' : 'none');

	const u = self ? '' : '?u=' + user.id;
</script>

<div onclick={() => menu == 'click' && (menuVisible = !menuVisible)} class={['user', menu, self && 'self']}>
	{#if !compact && access >= (!self && user.settings.hide_profile_picture ? Access.Protected : Access.Public)}
		<img src={user.picture} alt={user.first_name} />
	{/if}

	{user.first_name}
	{#if self || access >= (user.settings.hide_full_name ? Access.Protected : Access.Friend)}
		{user.last_name}
	{/if}

	<div class="menu" style:display={visibility}>
		<a href={'/settings' + u}>Settings</a>
		<a href={'/friends' + u}>Friends</a>
		<a href={'/logout' + u}>Logout</a>
	</div>
</div>

<style>
	.user {
		padding-bottom: 1em;
	}

	.self {
		position: fixed;
		right: 1em;
		top: 1em;
		z-index: 10;
	}

	.menu {
		display: none;
		position: absolute;
		top: 100%;
		padding: 1em;
		border: 1px solid #ccc;
		border-radius: 0.5em;
		flex-direction: column;
		gap: 1em;
		width: 100%;
	}

	.click:hover {
		cursor: pointer;
	}

	.hover:hover .menu {
		display: flex;
	}

	img {
		width: 2em;
		height: 2em;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 0.5em;
	}
</style>

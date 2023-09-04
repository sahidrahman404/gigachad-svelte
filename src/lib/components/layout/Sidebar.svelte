<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import 'iconify-icon';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	type List = Array<{
		href: string;
		label: string;
	}>;

	const menuNavLinks: Record<string, Array<{ title: string; list: List }>> = {
		'/dashboard': [
			{
				title: 'Dashboard',
				list: [
					{ href: '/dashboard/routines', label: 'Routines' },
					{ href: '/dashboard/exercises', label: 'Exercises' }
				]
			}
		],
		'/account': [
			{
				title: 'Account',
				list: [
					{ href: '/account/profile', label: 'Profile' },
					{ href: '/account/workouts', label: 'Workouts' }
				]
			}
		]
	};

	let currentRailCategory: keyof typeof menuNavLinks | undefined = undefined;

	// Lifecycle
	page.subscribe((page) => {
		let basePath: string = page.url.pathname.split('/')[2];
		if (!basePath) return;
		// Translate base path to link section
		if (['routines', 'exercises'].includes(basePath))
			currentRailCategory = '/dashboard';
		if (['profile', 'workouts'].includes(basePath))
			currentRailCategory = '/account';
	});

	// Reactive
	$: submenu = menuNavLinks[currentRailCategory ?? '/dashboard'];
	$: listboxItemActive = (href: string) =>
		$page.url.pathname?.includes(href) ? 'bg-primary-active-token' : '';
</script>

<div
	class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ??
		''}"
>
	<AppRail
		background="bg-surface-50-900-token"
		border="border-r border-surface-500/30"
	>
		<AppRailTile
			bind:group={currentRailCategory}
			name="dashboard"
			value={'/dashboard'}
		>
			<svelte:fragment slot="lead"
				><iconify-icon
					icon="radix-icons:dashboard"
					width="24"
					height="24"
				/></svelte:fragment
			>
			<span>Dashboard</span>
		</AppRailTile>
		<AppRailTile
			bind:group={currentRailCategory}
			name="account"
			value={'/account'}
		>
			<svelte:fragment slot="lead"
				><iconify-icon
					icon="radix-icons:person"
					width="24"
					height="24"
				/></svelte:fragment
			>
			<span>Account</span>
		</AppRailTile>
	</AppRail>

	<section class="p-4 pb-20 space-y-4 overflow-y-auto">
		{#each submenu as segment, i}
			<!-- Title -->
			<p class="font-bold pl-4 text-2xl">{segment.title}</p>
			<!-- Nav List -->
			<nav class="list-nav">
				<ul>
					{#each segment.list as { href, label }}
						<li on:keypress on:click={drawerStore.close}>
							<a
								{href}
								class={listboxItemActive(href)}
								data-sveltekit-preload-data="hover"
							>
								<span class="flex-auto">{@html label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<!-- Divider -->
			{#if i + 1 < submenu.length}<hr class="!my-6 opacity-50" />{/if}
		{/each}
	</section>
</div>

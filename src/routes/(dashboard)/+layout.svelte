<script lang="ts">
	import '../../app.postcss';
	import { AppBar, AppShell, Drawer } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import 'iconify-icon';

	initializeStores();
	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<Drawer>
	<Sidebar />
</Drawer>

<AppShell slotSidebarLeft="w-0 lg:w-96">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<iconify-icon icon="ic:round-menu" width="24" height="24" />
					</button>
					<a
						class="flex-none text-2xl font-bold text-primary-600"
						href="/"
						aria-label="Brand">Gigachad</a
					>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>

	<slot />
</AppShell>

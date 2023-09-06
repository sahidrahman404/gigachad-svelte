<script lang="ts">
	import '../../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$houdini';

	export let data: LayoutData;
	$: ({ UserSessionMarketing } = data);

	$: user = $UserSessionMarketing.data?.viewer
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if !user}
			<AppBar>
				<svelte:fragment slot="lead"
					><a class="text-primary-600 text-2xl font-bold" href="/">Gigachad</a
					></svelte:fragment
				>
				<svelte:fragment slot="trail">
					<a class="btn variant-ghost-primary" href="/auth?mode=signin"
						>Sign In</a
					>
					<a class="btn variant-filled-primary" href="/auth?mode=signup"
						>Sign up</a
					>
				</svelte:fragment>
			</AppBar>
		{:else}
			<AppBar>
				<svelte:fragment slot="lead"
					><a class="text-primary-600 text-2xl font-bold" href="/">Gigachad</a
					></svelte:fragment
				>
				<svelte:fragment slot="trail">
					<a class="btn variant-filled-primary" href="/dashboard/routines"
						>Dashboard</a
					>
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>

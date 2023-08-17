<script lang="ts">
	import '../../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import type { UserStore } from '$houdini';

	$: user = $page.data['User'] as UserStore;
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if !$user.data?.getUser}
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
					<a class="btn variant-filled-primary" href="/dashboard"
						>Dashboard</a
					>
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>

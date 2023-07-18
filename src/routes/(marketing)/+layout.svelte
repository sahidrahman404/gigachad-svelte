<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import type { UserStore } from '$houdini';

	$: user = $page.data['User'] as UserStore;
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if !$user.data?.getUser}
			<AppBar class="bg-surface-100-800-token p-4 shadow-xl">
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
			<AppBar class="bg-surface-100-800-token p-4 shadow-xl">
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

<script>
	import { page } from '$app/stores';
	import ResendActivationToken from '$lib/components/auth/ResendActivationToken.svelte';
	import VerifyActivationToken from '$lib/components/auth/VerifyActivationToken.svelte';

	$: mode = $page.url.searchParams.get('mode');
</script>

{#if mode === 'resend'}
	<ResendActivationToken />
{:else}
	<VerifyActivationToken />
{/if}

<script>
	import { page } from '$app/stores';
	import SendForgotPasswordToken from '$lib/components/auth/SendForgotPasswordToken.svelte';
	import ResetPassword from '$lib/components/auth/ResetPassword.svelte';

	$: mode = $page.url.searchParams.get('mode');
</script>

{#if mode === 'send'}
	<SendForgotPasswordToken />
{:else}
	<ResetPassword />
{/if}

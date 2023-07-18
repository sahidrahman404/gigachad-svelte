<script lang="ts">
	import Signup from '$lib/components/auth/Signup.svelte';
	import { page } from '$app/stores';
	import Signin from '$lib/components/auth/Signin.svelte';

	$: mode = $page.url.searchParams.get('mode');
</script>

{#if mode === 'signin'}
	<Signin />
{:else if mode === 'signup'}
	<Signup />
{:else}
	<Signup />
{/if}

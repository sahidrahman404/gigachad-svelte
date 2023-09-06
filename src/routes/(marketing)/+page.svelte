<script lang="ts">
	import Hero from '$lib/components/marketing/Hero.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: ({ UserSessionMarketing } = data);
	let redirect: string;
	$: $UserSessionMarketing.data?.viewer !== null
		? (redirect = '/dashboard/routines')
		: (redirect = '/auth?mode=signup');
</script>

<Hero redirect={redirect}/>

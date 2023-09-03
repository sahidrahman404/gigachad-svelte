<script lang="ts">
	import Hero from '$lib/components/marketing/Hero.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: ({ User } = data);
	let redirect: string;
	$: $User.data?.getUser !== null
		? (redirect = '/dashboard/routines')
		: (redirect = '/auth?mode=signup');
</script>

<Hero redirect={redirect}/>

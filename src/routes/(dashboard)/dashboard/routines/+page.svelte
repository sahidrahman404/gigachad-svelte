<script lang="ts">
	import Routines from '$lib/components/routines/Routines.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: ({ UserSession } = data);
</script>

<Routines user={$UserSession.data?.viewer ?? null} />

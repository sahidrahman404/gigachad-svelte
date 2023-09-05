<script lang="ts">
	export let user: UserRoutines$result["getUser"];

	import { fragment, graphql, type UserRoutines$result } from '$houdini';
	import Card from '$lib/components/routines/Card.svelte';
	import 'iconify-icon';

	$: data = fragment(
		user,
		graphql(`
			fragment RoutineFragment on User {
				routines @list(name: "Routines") {
					id
					name
				}
			}
		`)
	);

	$: routines = $data?.routines ?? []
</script>

{#if routines.length === 0}
	<div class="text-center mt-32">
		<iconify-icon icon="radix-icons:file-plus" width="64" height="64" />
		<h3 class="mt-2 text-sm font-medium text-gray-900">No routines</h3>
		<p class="mt-1 text-sm text-gray-500">
			Get started by creating a new routine.
		</p>
		<div class="mt-6">
			<a href="/dashboard/routines/new" class="btn variant-filled-primary">
				<iconify-icon icon="radix-icons:plus" />
				<span>New Routines</span>
			</a>
		</div>
	</div>
{/if}

{#if routines.length > 0}
	<div class="px-12 mt-12">
		<Card {routines} />
	</div>
{/if}

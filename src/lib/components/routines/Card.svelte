<script lang="ts">
	export let routines: any;
	import { graphql } from '$houdini';
	import { popup } from '@skeletonlabs/skeleton';
	import transformName from '../helpers/nameTransformer';
	import 'iconify-icon';

	const routine = graphql(`
		mutation RemoveRoutine($id: ID!) {
			deleteRoutine(id: $id) {
				id @Routine_delete
			}
		}
	`);

	function removeRoutine(id: string) {
		routine.mutate({ id: id });
	}
</script>

{#if routines}
	<ol class="space-y-4">
		{#each routines as { id, name }}
			<li class="card">
				<header class="card-header">
					<div class="flex">
						<h2 class="text-2xl">{transformName(name)}</h2>
						<div class="ml-auto">
							<button
								class="btn-icon variant-soft-primary"
								use:popup={{
									// Represents the type of event that opens/closed the popup
									event: 'click',
									// Matches the data-popup value on your popup element
									target: `routinesPopup-${id}`,
									// Defines which side of your trigger the popup will appear
									placement: 'bottom'
								}}
							>
								<iconify-icon
									icon="radix-icons:dots-horizontal"
									width="24"
									height="24"
								/>
							</button>
							<div
								class="card w-auto shadow-xl"
								data-popup="routinesPopup-{id}"
							>
								<div class="btn-group-vertical variant-soft-primary">
									<button>Edit</button>
									<button
										on:click={() => {
											removeRoutine(id);
										}}>Delete</button
									>
								</div>
							</div>
						</div>
					</div>
				</header>
				<footer class="card-footer mt-4">
					<button class="btn variant-filled-primary">Start Routine</button>
				</footer>
			</li>
		{/each}
	</ol>
{/if}

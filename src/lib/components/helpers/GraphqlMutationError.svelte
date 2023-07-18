<script lang="ts">
	import type { GraphqlError } from './graphql';
	export let graphqlMutationError: GraphqlError = null;
</script>

{#if graphqlMutationError}
	<ul>
		{#each graphqlMutationError as error}
			<li class="text-sm space-y-1 text-error-800 dark:text-error-50">
				{error.message}
			</li>
		{/each}
	</ul>
{/if}

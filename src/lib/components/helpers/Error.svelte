<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';
	export let forInput = ''
</script>

<ul
	aria-live="polite"
	class="text-sm space-y-1 mt-1 text-error-800 dark:text-error-50"
>
	<ValidationMessage for={forInput} let:messages>
		{#each messages ?? [] as message}
			<li>{message}</li>
		{/each}
	</ValidationMessage>
</ul>

<script lang="ts">
	export let messages: any | string[] | [];
</script>

<ul
	aria-live="polite"
	class="text-sm space-y-1 mt-1 text-error-800 dark:text-error-50"
>
	{#each messages ?? [] as message}
		<li>{message}</li>
	{/each}
</ul>

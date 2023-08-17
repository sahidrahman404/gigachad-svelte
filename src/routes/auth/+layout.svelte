<script>
	import '../../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<div class="h-full">
		<div class="flex h-full items-center py-16">
			<div class="w-full max-w-md mx-auto p-6"><slot /></div>
		</div>
	</div>
</AppShell>

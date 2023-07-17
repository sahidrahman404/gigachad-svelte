<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';
</script>

<div class="h-full">
	<div class="flex h-full items-center py-16">
		<div class="w-full max-w-md mx-auto p-6"><slot/></div>
	</div>
</div>

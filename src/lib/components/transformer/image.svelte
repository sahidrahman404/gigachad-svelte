<script lang="ts">
	import { transformProps } from './core';
	import type { ImageProps as BaseImageProps } from './types';
	import { onMount } from 'svelte';

	type $$Props = BaseImageProps;

	let transformed: any;
	onMount(async () => {
		let { style: parentStyle, ...props } = $$props as $$Props;
		let { ...transformedProps } = await transformProps({
			...props,
			style: {} as Record<string, string>
		});
		transformed = { ...transformedProps };
	});
</script>

<img {...transformed} />

<script lang="ts">
	import { browser } from '$app/environment';
	import { transformProps } from './core';
	import type { ImageProps as BaseImageProps } from './types';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import styleObjectToCss from './styleObjectToCss';

	type $$Props = BaseImageProps;

	const asyncReadable = (initial: any, loadFunction: any) => {
		let loadPromise: any;
		const loadValue = async (set: any, reload?: boolean) => {
			if (!loadPromise || reload) {
				loadPromise = loadFunction();
			}
			const storeValue = await loadPromise;
			set(storeValue);
			return storeValue;
		};
		const { subscribe, set } = writable(initial, (set) => {
			loadValue(set);
		});
		return {
			subscribe,
			load: () => loadValue(set),
			reload: () => loadValue(set, true)
		};
	};
	let { style: parentStyle, ...props } = $$props as $$Props;
	let width = `width: ${$$props.width}px;`;
	let height = `height: ${$$props.height}px;`;
	const tranformedProps = asyncReadable(undefined, async () => {
		if (browser) {
			const {
				alt,
				style: styleObj,
				...transformedProps
			} = await transformProps({
				...props,
				style: {} as Record<string, string>
			});
			const transformedStyle = [styleObjectToCss(styleObj), parentStyle]
				.filter(Boolean)
				.join(';');
			return {
				alt: alt,
				style: transformedStyle,
				rest: { ...transformedProps }
			};
		}
	});

	setContext('transformedProps', tranformedProps);
</script>

{#await tranformedProps.load()}
	<div
		class="placeholder animate-pulse"
		style="{width} {height}"
	/>
{:then}
	<img
		alt={$tranformedProps.alt}
		style={$tranformedProps.style}
		{...$tranformedProps.rest}
	/>
{/await}

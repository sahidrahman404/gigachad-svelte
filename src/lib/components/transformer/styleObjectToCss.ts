export default function styleObjectToCss(
	styleObject: Record<string, string | number>
): string {
	return Object.entries(styleObject)
		.map(([k, v]) => `${k}:${v}`)
		.join(';');
}

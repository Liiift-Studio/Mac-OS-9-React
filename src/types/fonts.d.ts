/**
 * TypeScript declarations for font file imports
 * Allows importing font files in TypeScript projects
 */

declare module '*.woff' {
	const content: string;
	export default content;
}

declare module '*.woff2' {
	const content: string;
	export default content;
}

declare module '*.ttf' {
	const content: string;
	export default content;
}

declare module '*.otf' {
	const content: string;
	export default content;
}

declare module '*.eot' {
	const content: string;
	export default content;
}

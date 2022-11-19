/// <reference types="@sveltejs/kit" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		auth: any;
	}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
	// interface PageData {}
}

declare const __DATE__: string;
declare const __RELOAD_SW__: boolean;

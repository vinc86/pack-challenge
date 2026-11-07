<script lang="ts">
	import { fly } from 'svelte/transition';

	let { message }: { message?: string } = $props();
</script>

<!-- The live region is always rendered so screen readers announce the message when it appears -->
<div aria-live="polite" class="fixed top-20 left-1/2 z-50 -translate-x-1/2">
	{#if message}
		<div
			transition:fly={{ y: -16, duration: 200 }}
			class="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm shadow-md"
		>
			<svg viewBox="0 0 24 24" class="size-5 shrink-0 text-green-600" aria-hidden="true">
				<circle cx="12" cy="12" r="10" fill="currentColor" />
				<path
					d="m8 12 3 3 5-6"
					fill="none"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			{message}
		</div>
	{/if}
</div>

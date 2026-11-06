<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLInputAttributes } from 'svelte/elements';

	const { ...rest }: HTMLInputAttributes = $props();
</script>

<input
	{...rest}
	class={clsx(rest.type === 'file' ? 'sr-only' : 'w-full rounded-md border-gray-400')}
/>

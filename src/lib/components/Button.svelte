<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const { children, ...rest }: HTMLButtonAttributes = $props();
</script>

<button
	{...rest}
	class="rounded-lg bg-orange-400 px-4 py-2 font-medium tracking-wider text-white {rest.class}"
	>{@render children?.()}</button
>

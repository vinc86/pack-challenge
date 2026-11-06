<script lang="ts">
	import { cn } from '#lib/utils/cn.ts';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const { children, class: className, ...rest }: HTMLButtonAttributes = $props();
</script>

<button
	{...rest}
	class={cn('rounded-lg bg-orange-400 px-4 py-2 font-medium tracking-wider text-white', className)}
>
	{@render children?.()}
</button>

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	const { ...rest }: HTMLInputAttributes = $props();
</script>

<input {...rest} class="w-full rounded-md border-gray-400" />

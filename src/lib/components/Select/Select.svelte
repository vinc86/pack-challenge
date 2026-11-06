<script lang="ts">
	import type { SelectProps } from './select.types';

	const { options, placeholder }: SelectProps = $props();
</script>

<select class="w-full rounded-md border-gray-400 text-gray-500">
	<option value="">{placeholder || 'Select*'}</option>
	{#each options as option (option.value)}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

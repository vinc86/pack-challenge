<script lang="ts">
	import clsx from 'clsx';
	import type { SelectProps } from './select.types';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	let {
		options,
		placeholder,
		value = $bindable(),
		...rest
	}: SelectProps & HTMLSelectAttributes = $props();
</script>

<select
	{...rest}
	bind:value
	class={clsx('w-full rounded-md border-gray-400', value ? 'text-black' : 'text-gray-400')}
>
	<option value="">{placeholder || 'Select*'}</option>
	{#each options as option (option.value)}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

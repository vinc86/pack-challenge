<script lang="ts">
	import type { Role } from '#lib/constants/roles.ts';
	import { getLabel } from '#lib/helpers/index.ts';
	import Button from './Button.svelte';
	import type { SelectProps } from './Select/select.types.ts';

	let selectedRoles: Role[] = $state([]);
	let open = $state(false);
	const { roles }: { roles: SelectProps } = $props();
</script>

<details class="relative" aria-label="Role" bind:open>
	<!-- head -->
	<summary
		class="w-full cursor-pointer list-none form-select rounded-md border-gray-400 text-gray-500 [&::-webkit-details-marker]:hidden"
	>
		{#if selectedRoles.length > 0}
			<div class="flex gap-2">
				{#each selectedRoles as selected (selected)}
					<span class="text-md rounded-full bg-gray-200 px-3 text-black"
						>{getLabel(roles, selected)}</span
					>
				{/each}
			</div>
		{:else}
			{roles.placeholder}
		{/if}
	</summary>
	<!-- multi-select content -->
	<div
		class="absolute z-10 mt-1 flex w-full flex-col gap-2 rounded-md border border-gray-400 bg-white p-3 shadow-md"
	>
		{#each roles.options as role (role.value)}
			<label class="flex items-center gap-2">
				<input
					type="checkbox"
					name="roles"
					value={role.value}
					bind:group={selectedRoles}
					class="rounded"
				/>
				{role.label}
			</label>
		{/each}
		<Button type="button" class="bg-gray-400" onclick={() => (open = false)}>Close</Button>
	</div>
</details>

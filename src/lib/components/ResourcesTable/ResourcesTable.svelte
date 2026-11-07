<script lang="ts">
	import { categories, languages, providers, roles } from '#lib/constants/uploadDialog.ts';
	import { getLabel } from '#lib/helpers/index.ts';
	import { getFileTypeLabel } from '#lib/constants/files.ts';
	import type { Resource } from '#lib/server/database.types.ts';
	import TableNav from './TableNav.svelte';
	import { resolve } from '$app/paths';

	type Props = {
		data: Resource[];
	};
	let { data = $bindable() }: Props = $props();

	function handleRowClick(event: MouseEvent | KeyboardEvent, resource: Resource) {
		if (event instanceof KeyboardEvent) {
			if (event.key !== 'Enter' && event.key !== ' ') return;
			if (event.key === ' ') event.preventDefault();
		}

		if ((event.target as HTMLElement).closest('button, a')) return;

		window.open(resolve('/resources/[id]/file', { id: resource.id }), '_blank', 'noopener');
	}
</script>

<div class="mx-auto mt-10 h-fit w-4/5 rounded-md border border-gray-300 p-10 shadow-md">
	<TableNav />
	<table class="mt-10 w-full table-auto border-collapse">
		<thead class="border-b border-b-gray-300">
			<tr class="h-12">
				<th class="text-left">Title</th>
				<th class="text-left">Description</th>
				<th class="text-left">Category</th>
				<th class="text-left">Language</th>
				<th class="text-left">Provider</th>
				<th class="text-left">Roles</th>
				<th class="text-left" colspan="2">Type</th>
			</tr>
		</thead>
		<tbody>
			{#each data as resource (resource.id)}
				<tr
					class="h-12 cursor-pointer border-b border-b-gray-300 hover:bg-gray-50"
					tabindex="0"
					onkeydown={(event) => handleRowClick(event, resource)}
					onclick={(event) => handleRowClick(event, resource)}
				>
					<td
						><a
							href={resolve('/resources/[id]/file', { id: resource.id })}
							target="_blank"
							rel="noopener noreferrer">{resource.title}</a
						></td
					>
					<td>{resource.description}</td>
					<td>{getLabel(categories, resource.category)}</td>
					<td>{getLabel(languages, resource.language)}</td>
					<td>{getLabel(providers, resource.provider)}</td>
					<td>
						<div class="flex gap-1">
							{#each resource.roles as role (role)}
								<span class="rounded-full bg-gray-100 px-3 py-1">{getLabel(roles, role)}</span>
							{/each}
						</div>
					</td>
					<td
						><span class="rounded-full bg-gray-100 px-3 py-1"
							>{getFileTypeLabel(resource.type)}</span
						></td
					>
					<td class="text-center">
						<button class="cursor-pointer" onclick={() => alert('button')}>...</button></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<script lang="ts">
	import { categories, languages, providers, roles } from '#lib/constants/uploadDialog.ts';
	import { getLabel } from '#lib/helpers/index.ts';
	import type { Resource } from '#lib/server/database.types.ts';
	import TableNav from './TableNav.svelte';

	type Props = {
		data: Resource[];
	};
	let { data = $bindable() }: Props = $props();
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
				<tr class="h-12 border-b border-b-gray-300">
					<td>{resource.title}</td>
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
					<td><span class="rounded-full bg-gray-100 px-3 py-1">{resource.type}</span></td>
					<td class="text-center">...</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

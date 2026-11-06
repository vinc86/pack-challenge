<script>
	import TableNav from './TableNav.svelte';
</script>

<div class="mx-auto mt-10 h-fit w-4/5 rounded-md border border-gray-300 p-10 shadow-md">
	<TableNav />
	<table class="mt-10 w-full table-auto border-collapse">
		<thead class="border-b border-b-gray-300">
			<tr class="h-12">
				<th class="text-left">Title</th>
				<th class="text-left">Category</th>
				<th class="text-left">Language</th>
				<th class="text-left">Provider</th>
				<th class="text-left">Roles</th>
				<th class="text-left">Type</th>
			</tr>
		</thead>
		<tbody>
			<tr class="h-12 border-b border-b-gray-300">
				<td>Conflict Resolution</td>
				<td>Leadership</td>
				<td>EN</td>
				<td>Pack</td>
				<td><span class="rounded-full bg-gray-100 px-3 py-1">Mentor/Coach</span></td>
				<td><span class="rounded-full bg-gray-100 px-3 py-1">PDF</span></td>
			</tr>
		</tbody>
	</table>
</div>

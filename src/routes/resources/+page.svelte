<script lang="ts">
	import ResourceTable from '#lib/components/ResourcesTable/ResourcesTable.svelte';
	import UploadDialog from '#lib/components/UploadDialog.svelte';

	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<section class="flex">
	<ResourceTable />
	<UploadDialog errors={form?.errorType === 'form-errors' ? form.errors : undefined} />
	{#if form?.errorType === 'upload-fail'}
		<p class="text-sm text-red-600">{form.message}</p>
	{/if}
</section>

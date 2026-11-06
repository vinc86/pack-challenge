<script lang="ts">
	import ResourceTable from '#lib/components/ResourcesTable/ResourcesTable.svelte';
	import UploadDialog from '#lib/components/UploadDialog.svelte';

	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<section class="flex">
	<ResourceTable />
	<UploadDialog errors={form?.errors} />
</section>

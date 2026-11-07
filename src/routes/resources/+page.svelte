<script lang="ts">
	import ResourceTable from '#lib/components/ResourcesTable/ResourcesTable.svelte';
	import Toast from '#lib/components/Toast.svelte';
	import UploadDialog from '#lib/components/UploadDialog.svelte';

	import type { PageProps } from './$types';

	let { form, data }: PageProps = $props();

	let toastMessage = $state<string>();
	let toastTimeout: ReturnType<typeof setTimeout>;

	function showToast(message: string) {
		toastMessage = message;
		clearTimeout(toastTimeout);
		toastTimeout = setTimeout(() => (toastMessage = undefined), 3000);
	}
</script>

<section>
	<h1 class="sr-only">Resources</h1>
	<ResourceTable data={data.resources} />
	<UploadDialog
		errors={form?.errorType === 'form-errors' ? form.errors : undefined}
		message={form?.errorType === 'upload-fail' ? form.message : undefined}
		onsuccess={() => showToast('Resource Uploaded Successfully!')}
	/>
	<Toast message={toastMessage} />
</section>

<script lang="ts">
	import { categories, languages, providers, roles } from '#lib/constants/uploadDialog.ts';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import Select from './Select/Select.svelte';
</script>

<dialog
	id="upload-dialog"
	class="relative mx-auto mt-30 h-fit w-150 flex-col gap-5 rounded-md border border-gray-300 p-10 open:flex"
>
	<button
		command="close"
		commandfor="upload-dialog"
		aria-label="Close"
		class="absolute top-4 right-4 cursor-pointer">&times;</button
	>
	<h2 class="text-xl">Upload Resource</h2>
	<form class="flex flex-col gap-5" method="POST">
		<Input type="text" placeholder="Title*" />
		<Input type="text" placeholder="Description*" />
		<Select {...categories} />
		<Select {...languages} />
		<Select {...providers} />
		<Select {...roles} />
		<Button class="ml-auto w-fit" type="submit">Upload</Button>
	</form>
</dialog>

<script lang="ts">
	import { categories, languages, providers, roles } from '#lib/constants/uploadDialog.ts';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import MultiSelect from './MultiSelect.svelte';
	import Select from './Select/Select.svelte';
	let fileName: string = $state('');
</script>

<dialog
	id="upload-dialog"
	class="relative mx-auto mt-30 h-fit w-150 flex-col gap-5 rounded-md border border-gray-300 p-10 open:flex"
	onclose={() => (fileName = '')}
	open
>
	<button
		command="close"
		commandfor="upload-dialog"
		aria-label="Close"
		class="absolute top-4 right-4 cursor-pointer">&times;</button
	>
	<h2 class="text-xl">Upload Resource</h2>
	<form class="flex flex-col gap-5" method="POST" action="?/upload" enctype="multipart/form-data">
		<Input type="text" placeholder="Title*" name="title" aria-label="Title" required />
		<Input
			type="text"
			placeholder="Description*"
			name="description"
			aria-label="Description"
			required
		/>
		<Select {...categories} name="category" aria-label="Category" required />
		<Select {...languages} name="language" aria-label="Language" required />
		<Select {...providers} name="provider" aria-label="Provider" required />

		<MultiSelect {roles} />

		<div class="flex gap-3">
			<input
				type="text"
				readonly
				tabindex="-1"
				placeholder="No file selected*"
				bind:value={fileName}
				class="w-full rounded-md border-gray-400"
			/>
			<label
				class="shrink-0 cursor-pointer rounded-md border border-gray-400 px-4 py-2 whitespace-nowrap hover:bg-gray-50 has-focus-visible:outline-2"
			>
				Select file
				<Input
					type="file"
					name="file_path"
					onchange={(e) => (fileName = e.currentTarget.value)}
					required
				/>
			</label>
		</div>

		<Button class="ml-auto w-fit" type="submit">Upload</Button>
	</form>
</dialog>

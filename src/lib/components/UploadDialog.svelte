<script lang="ts">
	import { categories, languages, providers, roles } from '#lib/constants/uploadDialog.ts';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import MultiSelect from './MultiSelect.svelte';
	import Select from './Select/Select.svelte';
	import { enhance } from '$app/forms';
	import { ALLOWED_FILE_TYPES } from '#lib/constants/files.ts';

	let dialog: HTMLDialogElement | undefined = $state();

	let fileName: string = $state('');

	type FormProps = { errors?: Record<string, string[] | undefined> };
	let { errors }: FormProps = $props();
	let formErrors = $derived(errors);
	let formElement: HTMLFormElement | undefined = $state();

	function resetForm() {
		fileName = '';
		formErrors = undefined;
		formElement?.reset();
	}
</script>

{#snippet fieldError(name: string)}
	{#if formErrors?.[name]?.length}
		<p class="text-sm text-red-600">{formErrors[name][0]}</p>
	{/if}
{/snippet}

<dialog
	bind:this={dialog}
	id="upload-dialog"
	class="relative mx-auto mt-30 h-fit w-150 flex-col gap-5 rounded-md border border-gray-300 p-10 open:flex"
	onclose={resetForm}
>
	<button
		command="close"
		commandfor="upload-dialog"
		aria-label="Close"
		class="absolute top-4 right-4 cursor-pointer">&times;</button
	>
	<h2 class="text-xl">Upload Resource</h2>

	<form
		bind:this={formElement}
		class="flex flex-col gap-5"
		method="POST"
		action="?/upload"
		enctype="multipart/form-data"
		use:enhance={() =>
			async ({ result, update }) => {
				await update();
				if (result.type === 'success') dialog?.close();
			}}
	>
		<div class="flex flex-col gap-1">
			<Input type="text" placeholder="Title*" name="title" aria-label="Title" required />
			{@render fieldError('title')}
		</div>
		<div class="flex flex-col gap-1">
			<Input
				type="text"
				placeholder="Description*"
				name="description"
				aria-label="Description"
				required
			/>
			{@render fieldError('description')}
		</div>
		<div class="flex flex-col gap-1">
			<Select {...categories} name="category" aria-label="Category" required />
			{@render fieldError('category')}
		</div>
		<div class="flex flex-col gap-1">
			<Select {...languages} name="language" aria-label="Language" required />
			{@render fieldError('language')}
		</div>
		<div class="flex flex-col gap-1">
			<Select {...providers} name="provider" aria-label="Provider" required />
			{@render fieldError('provider')}
		</div>
		<div class="flex flex-col gap-1">
			<MultiSelect {roles} />
			{@render fieldError('roles')}
		</div>
		<div class="flex flex-col gap-1">
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
						name="file"
						accept={ALLOWED_FILE_TYPES.join(',')}
						onchange={(e) => (fileName = e.currentTarget.files?.[0]?.name ?? '')}
						required
					/>
				</label>
			</div>
			{@render fieldError('file')}
		</div>
		<div class="flex">
			<Button class="ml-auto w-fit" type="submit">Upload</Button>
		</div>
	</form>
</dialog>

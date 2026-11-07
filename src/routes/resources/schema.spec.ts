import { describe, expect, it } from 'vitest';
import * as z from 'zod';
import { formSchema } from './schema';

const validInput = {
	title: 'How to deal with conflict',
	description: 'Step by step guide',
	category: 'conflict-resolution',
	language: 'en',
	provider: 'pack',
	roles: ['coach/mentor'],
	file: new File(['%PDF'], 'guide.pdf', { type: 'application/pdf' })
};

const fieldErrors = (input: unknown) => {
	const result = formSchema.safeParse(input);
	return result.success ? {} : z.flattenError(result.error).fieldErrors;
};

describe('formSchema', () => {
	it('accepts a valid resource', () => {
		expect(formSchema.safeParse(validInput).success).toBe(true);
	});

	it('rejects empty and too long text fields', () => {
		expect(fieldErrors({ ...validInput, title: '   ', description: 'a'.repeat(1001) })).toEqual({
			title: ['Title is required'],
			description: ['Description must be at most 1000 characters']
		});
	});

	it('only accepts select values offered in the form', () => {
		expect(fieldErrors({ ...validInput, provider: 'coursera', language: '' })).toEqual({
			provider: ['Select a provider'],
			language: ['Select a language']
		});
	});

	it('requires at least one valid role', () => {
		expect(fieldErrors({ ...validInput, roles: [] })).toEqual({
			roles: ['Select at least one role']
		});
	});

	it('rejects file types that are not allowed', () => {
		const file = new File(['<script></script>'], 'page.html', { type: 'text/html' });
		expect(fieldErrors({ ...validInput, file })).toEqual({ file: ['Unsupported file type'] });
	});
});

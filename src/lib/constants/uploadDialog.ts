import type { SelectProps } from '#lib/components/Select/select.types.ts';
import { ROLE_LABELS, ROLES } from './roles.ts';

export const categories: SelectProps = {
	placeholder: 'Categories*',
	options: [
		{ label: 'Leadership', value: 'leadership' },
		{
			label: 'Managing Complexity',
			value: 'managing-complexity'
		},
		{
			label: 'Conflict Resolution',
			value: 'conflict-resolution'
		}
	]
};

export const languages: SelectProps = {
	placeholder: 'Language*',
	options: [
		{
			value: 'en',
			label: 'English'
		},
		{
			value: 'it',
			label: 'Italian'
		},
		{
			value: 'es',
			label: 'Spanish'
		}
	]
};

export const providers: SelectProps = {
	placeholder: 'Provider*',
	options: [
		{ value: 'skilla', label: 'Skilla' },
		{ value: 'linkedin', label: 'LinkedIn' },
		{ value: 'pack', label: 'Pack' },
		{ value: 'mentor', label: 'Mentor' }
	]
};

export const roles: SelectProps = {
	placeholder: 'Role*',
	options: ROLES.map((role) => ({ value: role, label: ROLE_LABELS[role] }))
};

import type { SelectProps } from '#lib/components/Select/select.types.ts';

export function getLabel(field: SelectProps, value: string) {
	return field.options.find((el) => el.value === value)?.label ?? value;
}

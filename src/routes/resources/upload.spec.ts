import { beforeEach, describe, expect, it, vi } from 'vitest';

// Replace the database and the file system so the action can be tested in isolation
const execute = vi.fn();
vi.mock('#lib/server/db.ts', () => ({
	database: { insertInto: () => ({ values: () => ({ execute }) }) }
}));
vi.mock('node:fs/promises', () => ({ mkdir: vi.fn(), writeFile: vi.fn(), rm: vi.fn() }));

const { actions } = await import('./+page.server');
const fs = vi.mocked(await import('node:fs/promises'));

function upload() {
	const body = new FormData();
	body.set('title', 'Title');
	body.set('description', 'Description');
	body.set('category', 'leadership');
	body.set('language', 'en');
	body.set('provider', 'pack');
	body.append('roles', 'coach/mentor');
	body.set('file', new File(['%PDF'], 'guide.pdf', { type: 'application/pdf' }));

	const request = new Request('http://localhost/resources?/upload', { method: 'POST', body });
	return actions.upload({ request } as Parameters<typeof actions.upload>[0]);
}

const uploadFailed = {
	status: 500,
	data: { errorType: 'upload-fail', message: 'Could not save the resource. Please try again.' }
};

beforeEach(() => {
	vi.clearAllMocks();
	vi.spyOn(console, 'log').mockImplementation(() => {});
	fs.mkdir.mockResolvedValue(undefined);
	fs.writeFile.mockResolvedValue(undefined);
	fs.rm.mockResolvedValue(undefined);
	execute.mockResolvedValue([]);
});

describe('upload action', () => {
	it('saves the file and the resource', async () => {
		expect(await upload()).toEqual({ success: true });
		expect(fs.writeFile).toHaveBeenCalledWith(
			expect.stringMatching(/^uploads\/.+\.pdf$/),
			expect.any(Buffer)
		);
		expect(execute).toHaveBeenCalledOnce();
	});

	it('returns upload-fail without saving to the database when writing the file fails', async () => {
		fs.writeFile.mockRejectedValue(new Error('ENOSPC'));

		expect(await upload()).toMatchObject(uploadFailed);
		expect(execute).not.toHaveBeenCalled();
		expect(fs.rm).toHaveBeenCalledOnce();
	});

	it('returns upload-fail even if removing the orphaned file fails', async () => {
		execute.mockRejectedValue(new Error('database unavailable'));
		fs.rm.mockRejectedValue(new Error('EPERM'));

		expect(await upload()).toMatchObject(uploadFailed);
		expect(fs.rm).toHaveBeenCalledOnce();
	});
});

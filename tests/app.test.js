import { describe, expect, it } from 'vitest';
import { clearCompletedTasks } from '../src/app.js';

describe('clearCompletedTasks', () => {
	it('removes completed tasks and keeps incomplete tasks', () => {
		const tasks = [
			{ id: 1, title: 'First task', completed: false },
			{ id: 2, title: 'Second task', completed: true },
			{ id: 3, title: 'Third task', completed: false },
		];

		expect(clearCompletedTasks(tasks)).toEqual([
			{ id: 1, title: 'First task', completed: false },
			{ id: 3, title: 'Third task', completed: false },
		]);
	});
});

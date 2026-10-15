function createTask(title, description ="") {
  return {
    id: Date.now(),
    title:title.trim(),
    description :description.trim(),
    completed: false
  };
}

function isValidTask(task) {
  if (!task) return false;
  return typeof task.title === 'string' && task.title.trim().length > 0;
}

function filterTasks(tasks, criteria) {
  if (criteria === 'completed') return tasks.filter(t => t.completed);
  if (criteria === 'pending') return tasks.filter(t => !t.completed);
  return tasks;
}

function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  return {
    total,
    completed,
    pending: total - completed
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createTask, isValidTask, filterTasks, getTaskStats };
}


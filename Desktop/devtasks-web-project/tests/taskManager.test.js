const { createTask, isValidTask, filterTasks, getTaskStats } = require('../js/taskManager');

describe('Pruebas unitarias para taskManager.js', () => {

  test('Debería crear un objeto tarea con los campos correctos y estado inicial pendiente', () => {
    const task = createTask('Aprender GitHub Actions', 'Completar el PAS 4 del proyecto');
    
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Aprender GitHub Actions');
    expect(task.completed).toBe(false); 
  });

  test('Debería validar correctamente una tarea válida y rechazar títulos vacíos', () => {
    const validTask = { title: 'Hacer la compra', completed: false };
    const invalidTask = { title: '   ', completed: false }; 

    expect(isValidTask(validTask)).toBe(true);
    expect(isValidTask(invalidTask)).toBe(false);
  });

  test('Debería filtrar las tareas correctamente por su estado (completadas / pendientes)', () => {
    const mockTasks = [
      { id: 1, title: 'Tarea 1', completed: true },
      { id: 2, title: 'Tarea 2', completed: false },
      { id: 3, title: 'Tarea 3', completed: true }
    ];

    const completedTasks = filterTasks(mockTasks, 'completed');
    const pendingTasks = filterTasks(mockTasks, 'pending');
    const allTasks = filterTasks(mockTasks, 'all');

    expect(completedTasks).toHaveLength(2);
    expect(pendingTasks).toHaveLength(1);
    expect(allTasks).toHaveLength(3);
  });

  test('Debería calcular con precisión el total, completadas y pendientes', () => {
    const mockTasks = [
      { title: 'T1', completed: true },
      { title: 'T2', completed: false },
      { title: 'T3', completed: false }
    ];

    const stats = getTaskStats(mockTasks);

    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(1);
    expect(stats.pending).toBe(2);
  });

  test('Caso límite: estadísticas con una lista vacía y filtrado con criterios desconocidos', () => {
    const emptyStats = getTaskStats([]);
    expect(emptyStats).toEqual({ total: 0, completed: 0, pending: 0 });

    const mockTasks = [{ title: 'T1', completed: true }];
    const filtered = filterTasks(mockTasks, 'INVALID_CRITERIA');
    expect(filtered).toHaveLength(1);
    
    expect(isValidTask(null)).toBe(false);
    expect(isValidTask({})).toBe(false);
  });

});

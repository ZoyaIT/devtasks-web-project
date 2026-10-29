const { createTask, isValidTask, filterTasks, getTaskStats } = require('../js/taskManager');

describe('Pruebas unitarias para taskManager.js', () => {

  // 1. COMPROBAR CREACIÓN DE UNA TAREA
  test('Debería crear un objeto tarea con los campos correctos y estado inicial pendiente', () => {
    const task = createTask('Aprender GitHub Actions', 'Completar el PAS 4 del proyecto');
    
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Aprender GitHub Actions');
    // expect(task.description).toBe('Completar el PAS 4 del proyecto');
    expect(task.completed).toBe(false); // Comportamiento real: nace incompleta
  });

  // 2. COMPROBAR VALIDACIÓN DE UNA TAREA
  test('Debería validar correctamente una tarea válida y rechazar títulos vacíos', () => {
    const validTask = { title: 'Hacer la compra', completed: false };
    const invalidTask = { title: '   ', completed: false }; // Solo espacios en blanco

    expect(isValidTask(validTask)).toBe(true);
    expect(isValidTask(invalidTask)).toBe(false);
  });

  // 3. COMPROBAR FILTRADO DE TAREAS
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

  // 4. COMPROBAR CÁLCULO DE ESTADÍSTICAS
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

  // 5. COMPROBAR CASOS LÍMITE (Edge Cases)
  test('Caso límite: estadísticas con una lista vacía y filtrado con criterios desconocidos', () => {
    // Caso límite 1: Lista vacía en estadísticas
    const emptyStats = getTaskStats([]);
    expect(emptyStats).toEqual({ total: 0, completed: 0, pending: 0 });

    // Caso límite 2: Criterio de filtrado inválido o inexistente (debe devolver todo por defecto)
    const mockTasks = [{ title: 'T1', completed: true }];
    const filtered = filterTasks(mockTasks, 'INVALID_CRITERIA');
    expect(filtered).toHaveLength(1);
    
    // Caso límite 3: Validación si el objeto es null o no tiene propiedad title
    expect(isValidTask(null)).toBe(false);
    expect(isValidTask({})).toBe(false);
  });

});
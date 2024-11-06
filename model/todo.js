const todos = [
    {
        texte: 'Faire le laboratoire todo',
        estCoche: false
    },
    {
        texte: 'Faire le laboratoire de la librairie',
        estCoche: false
    }
];

/**
 * Retourne l'ensemble des tâches.
 * @returns L'ensemble des tâches.
 */
export function getTodos() {
    return todos;
}

/**
 * Ajoute une tâche dans l'ensemble de tâches.
 * @param {string} texte Le texte de la tâche à ajouter.
 * @returns L'index de la tâche ajoutée.
 */
export function addTodo(texte) {
    todos.push({
        texte: texte,
        estCoche: false
    });

    return todos.length - 1;
}

/**
 * Coche ou décoche une tâche dans l'ensemble de tâches.
 * @param {number} index Index de la tâche à cocher ou décocher.
 */
export function checkTodo(index) {
    todos[index].estCoche = !todos[index].estCoche;
}

/**
 * 
 * @param {*} index 
 * @returns 
 */
export function getTodo(index) {
    return todos[index];
}

// Constante d'élément dans le HTML de la page
const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoText = document.getElementById('todo-text');

/**
 * Ajoute une tâche dans l'interface graphique.
 * @param {string} texte Le texte de la tâche à ajouter.
 * @param {bool} estCoche Le status de la case à cocher de la tâche à ajouter.
 * @param {number} index L'index sur le serveur de la tâche à ajouter.
 */
function addTodoClient(texte, estCoche, index) {
    // Créer l'élément de la liste
    const li = document.createElement('li');

    // Créer la case à cocher
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = estCoche;
    checkbox.dataset.index = index;
    checkbox.addEventListener('change', checkTodoServeur);
    li.append(checkbox);

    // Créer le paragraphe
    const p = document.createElement('p');
    p.innerText = texte;
    li.append(p);

    todoList.append(li);
}

/**
 * Demande au serveur d'avoir toute la liste des tâches et l'ajoute dans 
 * l'interface graphique.
 */
async function getTodosServeur() {
    // Envoyer la requête HTTP
    const response = await fetch('/api/todos');

    // Traitement de la réponse
    if(response.ok) {
        // Chercher la listes des tâches retourné
        const todos = await response.json();

        // Boucler sur chaque tâche pour l'ajouter dans l'interface graphique
        for(let i = 0 ; i < todos.length ; i++) {
            addTodoClient(todos[i].texte, todos[i].estCoche, i);
        }
    }
}

/**
 * Ajoute une tâche sur le serveur.
 * @param {Event} event Submit event du formulaire.
 */
async function addTodoServeur(event) {
    // Prévient le comportement par défaut d'un formulaire qui rafraîchit la 
    // page lorsqu'on le soumet
    event.preventDefault();

    // Préparer les données
    const data = {
        texte: todoText.value
    };

    // Envoyer la requête HTTP
    const response = await fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // Traitement de la réponse
    if(response.ok) {
        // Chercher l'index de la tâche retourné
        const objectIndex = await response.json();

        // Ajoute aussi la tâche dans l'interface graphique
        addTodoClient(todoText.value, false, objectIndex.index);

        // Réinitialiser le formulaire
        todoText.value = '';
        todoText.focus();
    }
}

/**
 * Coche ou décoche une tâche sur le serveur.
 * @param {Event} event Change event de la case à cocher.
 */
async function checkTodoServeur(event) {
    // Préparer les données
    const data = {
        index: Number(event.currentTarget.dataset.index)
    };

    // Envoyer la requête HTTP
    const response = await fetch('/api/todo', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // Traitement de la réponse
    if(response.ok) {
        // Aucun traitement nécessaire
    }
}

// Exécuter au chargement de la page
// Chercher les données du serveur pour l'interface graphique
getTodosServeur();

// Programme la soumission du formulaire
todoForm.addEventListener('submit', addTodoServeur)

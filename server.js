// Charger les configuration
import 'dotenv/config';

// Importation du projet
import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { addTodo, checkTodo, getTodo, getTodos } from './model/todo.js';

// Création du serveur
const app = express();

// Ajout de middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(express.static('public'));

// Affichage de tous les echanges actifs
app.get('/api/uEchangesLegos', (request, response) => {
   // const todos = getTodos();
   // response.status(200).json(todos);
});

// Afficher voir les details d'un echange
app.get('/api/uEchangesLegos/{idU-idLego}', (request, response) => {
    // const todos = getTodos();
    // response.status(200).json(todos);
 });

 // Affichage de tous les echanges d'un utilisateur
app.get('/api/uEchangesLegos/idU', (request, response) => {
  /*  const index = addTodo(request.body.texte);
    response.status(201).json({ index: index });*/
});

 // Creer un echange: cette page affiches tous les brics dans un premier temps, et proposer l'ajout
 app.post('/api/CreerEchangeLego', (request, response) => {
    /*  const index = addTodo(request.body.texte);
      response.status(201).json({ index: index });*/
  });
/*
app.patch('/api/todo', (request, response) => {
    checkTodo(request.body.index);
    response.status(200).end();
});

app.get('/api/todo', (request, response) => {
    const todo = getTodo(request.query.index);
    response.status(200).json(todo);
});
*/
// Démarrer le serveur
console.log('Serveur démarré: ');
console.log('http://localhost:' + process.env.PORT);
app.listen(process.env.PORT);

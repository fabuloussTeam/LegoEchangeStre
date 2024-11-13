// Charger les configuration
import 'dotenv/config';

// Importation du projet
import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { engine } from 'express-handlebars';

import { getEchangesProposes, 
        getEchangeUtilisateurCourant,
        getTousLesBriques, 
        getEchange } from './model/modelEchange.js';


// Création du serveur
const app = express();

// Ajout des engins au serveur
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views'); //Repertoire de base


// Ajout de middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(express.static('public'));



//ROUTES

// Programmation de routes
app.get('/', async (request, response) => {
   const echangesactifs = await getEchangesProposes();
    response.render('index', {
        titre: 'Accueil | Lego',
        mainTitle: 'A la Une',
        styles: ['/css/style.css'],
        scripts: ['/js/echanges.js'],
        echangesActifs: echangesactifs,
    });
});

// Affichage les details de l'echange courant
app.get('/api/detailsEchangesCourant', async (request, response) => {
    const echangesdeutilisateurcourant = await getEchangeUtilisateurCourant();
    response.render('echangeducomptecourant', {
        titre: 'Mes Echanges',
        mainTitle: 'Liste de mes echanges',
        styles: ['/css/style.css'],
        scripts: ['/js/echanges.js'],
        tousmesechangecourant: echangesdeutilisateurcourant,
     }); 
});

 // Affichage de tous les briques et ajoute un echange
app.get('/api/uEchangesLegos', async (request, response) => {
    const TousLesBriques = await getTousLesBriques();
    response.render('creerechange', {
        titre: 'Ajouter | Echange',
        mainTitle: 'Creer un echange',
        styles: ['/css/style.css'],
        scripts: ['/js/echanges.js'],
        tousLesbriques: TousLesBriques,
     }); 
});

//details d'un echange
app.get('/api/legoEchangeDetails/:briqueID', async (request, response) => {
   const TousLesBriques = await getTousLesBriques();
   
   const echangeId = request.params.briqueID;
   if(!echangeId){
    return response.redirect("/");
    }
    const echange = await getEchange(echangeId);

   // console.log(`mon echange: ${echange.toString()}`);
     
  /*  echange.forEach(element => {
        console.log(`je suis la ${element}`);
        
    }); */
        response.render('detailUnEchange', {
            titre: 'Detail de la brique',
            mainTitle: echange.nomBrique,
            styles: ['/css/style.css'],
            scripts: ['/js/echanges.js'],
            brique: echange,
        });
    
          
          
        
});

  




// Démarrer le serveur
console.log('Serveur démarré: ');
console.log('http://localhost:' + process.env.PORT);
app.listen(process.env.PORT);

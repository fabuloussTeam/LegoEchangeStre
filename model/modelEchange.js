import { connexion } from '../db/db.js';


// Recuperer tous les echanges actifs

export async function getEchangesProposes() {
    const utilisateurs = await connexion.all(`SELECT * FROM couleur  
RIGHT JOIN brique ON couleur.id_couleur = brique.id_couleur 
RIGHT JOIN proposition_brique ON brique.id_brique = proposition_brique.id_brique
RIGHT JOIN proposition ON proposition_brique.id_proposition = proposition.id_proposition
RIGHT JOIN utilisateur ON proposition.id_utilisateur = utilisateur.id_utilisateur
WHERE proposition.id_proposition IS NOT NULL
GROUP BY utilisateur.nom;`); 
    return utilisateurs;
}

// Recuperer tous les briques de l'utilisateur courant id_utlisateur = 1
export async function getEchangeUtilisateurCourant() {
    const echanges = await connexion.all(`SELECT brique.id_couleur, couleur.nomCouleur, brique.id_design,
brique.nomBrique, brique.image, brique.valeur, utilisateur.courriel, utilisateur.nom,
utilisateur.prenom, utilisateur.mot_de_passe, utilisateur.acces
FROM brique 
RIGHT JOIN couleur ON couleur.id_couleur = brique.id_couleur
RIGHT JOIN proposition_brique ON brique.id_brique = proposition_brique.id_brique
RIGHT JOIN proposition ON proposition_brique.id_proposition = proposition.id_proposition
RIGHT JOIN utilisateur ON proposition.id_utilisateur = utilisateur.id_utilisateur
WHERE proposition.id_utilisateur = 1;`);
    return echanges;
}

// Ajouter tous un echanges
export async function getTousLesBriques(){
    const tousLesBrics = await connexion.all(`SELECT * FROM brique;`);
        return tousLesBrics;
}

export async function getEchange(idBrique){
    const mesBriques = await getTousLesBriques();
        parseInt(idBrique)
        const echangefilter = mesBriques.filter(function (el) {
            return el.id_brique == idBrique;
        });
        return echangefilter
}






import Formulaire from './Formulaire.js';
import Tache from './Tache.js';
import TrierTaches from './TrierTaches.js';
import Router from './Router.js';


// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du formulaire
    let elFormulaire = document.querySelector('[data-js-formulaire]');
    if (elFormulaire) {

        new Formulaire(elFormulaire);
    }

    // Initialisation des tâches
    let elsTaches = document.querySelectorAll('[data-js-taches]');
    for (let i = 0; i < elsTaches.length; i++) {
        
        new Tache(elsTaches[i]);
    }

    // Initialisation du bouton
        new TrierTaches();

    new Router;
    

});

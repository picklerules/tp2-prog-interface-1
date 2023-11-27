import Formulaire from './Formulaire.js';
import Tache from './Tache.js';
import TrierTaches from './TrierTaches.js';
import Router from './Router.js';


document.addEventListener('DOMContentLoaded', function() {

    let elFormulaire = document.querySelector('[data-js-formulaire]');
    if (elFormulaire) {

        new Formulaire(elFormulaire);
    }

    let elsTaches = document.querySelectorAll('[data-js-taches]');
    for (let i = 0; i < elsTaches.length; i++) {
        
        new Tache(elsTaches[i]);
    }

        new TrierTaches();

        new Router;
    

});

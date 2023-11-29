import Formulaire from './Formulaire.js';
import Tache from './Tache.js';
import TrierTaches from './TrierTaches.js';
import Router from './Router.js';
import Detail from './Detail.js';

document.addEventListener('DOMContentLoaded', function() {

    let elSectionDetail = document.querySelector('[data-js-detail]');

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

    new Detail(elSectionDetail);


});

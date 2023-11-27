import Formulaire from './Formulaire.js';
import { afficheDetail } from './DetailsService.js'

export default class Tache {
    #_el;
    #_index;
    #_elActions;
    #_elTaches;
    #_elTacheDetail;
    #_id;
    #_elCible;

    constructor(el) {

        this.#_el = el;
        this.#_index = this.#_el.dataset.jsTache;
        this.#_elActions = this.#_el.querySelector('[data-js-actions]');
        
        this.#_elTaches = this.#_el.closest('[data-js-taches]');
        this.#_elTacheDetail = document.querySelector('[data-js-tache-detail]');
        
        this.#_id = this.#_el.dataset.jsTaches; 
        this.#_elCible = document.querySelector('#cible');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this.#_elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'afficher') this.afficheDetail();
            else if (e.target.dataset.jsAction == 'supprimer') this.supprimeTache();

            window.scrollTo({
                top: this.#_elCible.getBoundingClientRect().top - 50,
                behavior: 'smooth'
            });
        }.bind(this));
    }


    /**
     * Affiche le détail d'une tâche
     */
    afficheDetail() {
        
        location = `#!/taches/${this.#_id}`;

    }


    /**
     * Supprime la tâche du tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     */
    supprimeTache() {

        let tache = {
            action: 'deleteTask',
            id: this.#_id 
        };

        let oOptions = {
            method: 'POST', // Méthode POST
            headers: {
                'Content-type': 'application/json' // Type de contenu
            },
            body: JSON.stringify(tache)// Corps de la requête avec les données en format JSON
        };

        // Requête fetch pour obtenir les taches
        fetch('requetes/requetesAsync.php', oOptions)
        .then(function (reponse) {
            // console.log(reponse.ok);
            // Traitement de la réponse
            if(reponse.ok) return reponse.text(); 
        
        })
        .then(function(id) {

            // console.log(id);
            this.#_el.remove(); 
            
         }.bind(this))


    }
}
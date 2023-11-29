import Formulaire from './Formulaire.js';
import { afficheDetail } from './DetailsService.js'

export default class Tache {

    constructor(el) {

        this._el = el;
        this._index = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        this._elTaches = this._el.closest('[data-js-taches]');
        this._elTacheDetail = document.querySelector('[data-js-tache-detail]');
        this._id = this._el.dataset.jsTaches; 
        this._elSectionDetail = document.querySelector('[data-js-detail]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'afficher') this.afficheDetail();
            else if (e.target.dataset.jsAction == 'supprimer') this.supprimeTache();

            window.scrollTo({
                top: this._elSectionDetail.getBoundingClientRect().top - 50,
                behavior: 'smooth'
            });
        }.bind(this));
    }


    /**
     * Navigue vers le détail de la tâche spécifiée
     */
    afficheDetail() {
        
        location = `#!/taches/${this._id}`;

    }


    /**
     * Supprime la tâche du tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     */
    supprimeTache() {

        let tache = {
            action: 'deleteTask',
            id: this._id 
        };

        let oOptions = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json' 
            },
            body: JSON.stringify(tache)
        };

        fetch('requetes/requetesAsync.php', oOptions)
        .then(function (reponse) {
  
            if(reponse.ok) return reponse.text(); 
        
        })
        .then(function(id) {

            this._el.remove(); 
            
         }.bind(this))


    }
}
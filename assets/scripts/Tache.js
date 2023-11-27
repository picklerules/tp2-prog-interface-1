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
        this._elCible = document.querySelector('#cible');

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
                top: this._elCible.getBoundingClientRect().top - 50,
                behavior: 'smooth'
            });
        }.bind(this));
    }


    /**
     * Affiche le détail d'une tâche
     */
    afficheDetail() {
        
        location = `#!/taches/${this._id}`;

        // let elDetailDom =  `<div class="detail__info">
        //                         <p><small>Tâche : </small>${aTaches[this._index].tache}</p>
        //                         <p><small>Description : </small>${description ? description : 'Aucune description disponible.'}</p>
        //                         <p><small>Importance : </small>${aTaches[this._index].importance}</p>
        //                     </div>`;

        // this._elTacheDetail.innerHTML = elDetailDom;
    }


    /**
     * Supprime la tâche du tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     */
    supprimeTache() {

        //comme exercice 3, requete fetch 

        let tache = {
            action: 'deleteTask',
            id: this._id 
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
            this._el.remove(); 
            
         }.bind(this))


    }
}
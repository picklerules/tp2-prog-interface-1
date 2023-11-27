import Tache from './Tache.js';
import ValideFormulaire from './Validation.js';

export default class Formulaire {
    constructor(el) {
        
        this._el = el;
        this._elInputTache = this._el.tache;
        this._elInputDescription = this._el.description;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        this._elSectionToDo = document.querySelector('.to-do-list');
        this._elNewTask = document.querySelector('[data-js-newtask]');
        this._elTaches = document.querySelector('[data-js-taches]');
        this._elTemplateTache = document.querySelector('[data-template-tache]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            /* Si valide */
            new ValideFormulaire(this._el);
            
            this.ajouteTache();
            this._el.reset();

        }.bind(this));
    }

    
    /**
     * Ajoute la tâche 
     */
    ajouteTache() {

        let tache = {
            action: 'addTask',
            tache: this._elInputTache.value,
            description: this._elInputDescription.value,
            importance: this._el.querySelector('input[name="importance"]:checked').value
        }


        // Options pour la requête fetch
        let oOptions = {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json' 
            },
            body: JSON.stringify(tache) 
        };

        // Requête fetch pour obtenir les taches
        fetch('requetes/requetesAsync.php', oOptions)
        .then(function (reponse) {
 
            // Traitement de la réponse
            if(reponse.ok) return reponse.json();
            else throw new Error('La réponse n\'est pas ok'); 
        })
        .then(function(id) {

            tache.id = id ; 
                    
                let elCloneTemplate = this._elTemplateTache.cloneNode(true); 

                // Remplacement des placeholders dans le template
                for (const cle in tache) {
                    let regex = new RegExp('{{' + cle + '}}', 'g');
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, tache[cle]);
                }

                // Importation de la nouvelle tache dans le DOM
                let elNewTask = document.importNode(elCloneTemplate.content, true);
                this._elNewTask.append(elNewTask); 
                new Tache(this._elNewTask.lastElementChild);
                
            
        }.bind(this))
        .catch(function(err) {
            // Gestion des erreurs
            console.log(err.message);
        });

    }
}
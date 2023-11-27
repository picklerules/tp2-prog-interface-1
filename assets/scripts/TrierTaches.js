import Tache from './Tache.js';

export default class TrierTaches {
    constructor() {
    
        this._elNewTask = document.querySelector('[data-js-newtask]');
        this._elsButtonsTri = document.querySelectorAll('[data-js-trier]');
        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {

        for (let i = 0; i < this._elsButtonsTri.length; i++) {
            
            this._elsButtonsTri[i].addEventListener('click', function(e) {

            let tri = this._elsButtonsTri[i].dataset.jsTrier;

            if (tri == 'tache') {

                this.triage('trierAlpha');

            } else if (tri == 'importance') {

                this.triage('trierImportance');

            }
            
        }.bind(this));
        }
        
    }

    triage(btn) {
        
        let tache = {
            action: btn
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
        .then(function(data) {

            this._elNewTask.innerHTML = '';

            for (let i = 0; i < data.length; i++) {
                this._elNewTask.innerHTML += `<div class="tache" data-js-taches="${data[i][0]}">
                <p>
                      <span>
                          <small>Tâche : </small> ${data[i][1]} 
                      </span> 
                      <span>
                          <small>Importance : </small> ${data[i][3]}
                      </span>
                      <span data-js-actions>
                          <button data-js-action="afficher">Afficher le détail</button>
                          <button data-js-action="supprimer">Supprimer</button>
                      </span>
                  </p>
              </div>`    
            }


            let elsTaches = document.querySelectorAll('[data-js-taches]');
                for (let i = 0; i < elsTaches.length; i++) {
                    
                    new Tache(elsTaches[i]);
                }


            
        }.bind(this))
        .catch(function(err) {
            // Gestion des erreurs
            console.log(err.message);
        });

    }





}
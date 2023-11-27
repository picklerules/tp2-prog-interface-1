import { afficheDetail } from './DetailsService.js'

export default class Router {
    #_routes;
    constructor() {


        this._elTemplateDetails = document.querySelector('[data-js-template-details]')


        this.#_routes = [
            ['/taches/:id', afficheDetail]
        ];

        this._path = location.pathname;


        this.init();
    }

    /**
     * Initialise les comportements
     */
    init() {
   
        window.addEventListener('hashchange', function() {
            let id = this.#gereHashbang();
            // console.log(id);

        }.bind(this));
    }

    #gereHashbang() {
        let hash = window.location.hash.slice(2),
            isRoute = false,
            isId;

        if (hash.endsWith('/')) hash = hash.slice(0, -1);

        for (let i = 0, l = this.#_routes.length; i < l; i++) {
            let route = this.#_routes[i][0];

            if (route.indexOf(':') > -1) {
                route = route.substring(0, route.indexOf('/:'));
                isId = true;
            }

            if (hash.indexOf(route) > -1) {
                let hashInArray = hash.split(route);

                if (hashInArray[1]) {
                    if (isId) {
                        let id = hashInArray[1].slice(1);
                        this.#_routes[i][1](id);
                        isRoute = true;
                        return id;
                    }
                } else {
                    if (hash === this.#_routes[i][0]) {
                        this.#_routes[i][1]();
                        isRoute = true;
                    }
                }
            }
        }
    }



//     afficheDetail(id) {
      
//         let tache = {
//             action: 'getDetails',
//             id: id
//         }

//         let oOptions = {
//             method : "POST", 
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(tache)
//         }

//         fetch('requetes/requetesAsync.php', oOptions)
//         .then(function (reponse) {
//             // console.log(reponse.ok);
//             // Traitement de la réponse
//             if(reponse.ok) return reponse.json(); // Si OK, convertir en JSON
        
//         })
//         .then(function(data) {

      

            

            

//     })
// };

    // #gereActif(id = null) {
    //     // Logique pour gérer l'état actif (à ajouter si nécessaire)
    // }
}

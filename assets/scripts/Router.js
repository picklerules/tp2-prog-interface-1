import { afficheDetail } from './DetailsService.js'

export default class Router {
    #_routes;
    #_elTemplateDetails;
    constructor() {


        this.#_elTemplateDetails = document.querySelector('[data-js-template-details]')


        this.#_routes = [
            ['/taches/:id', afficheDetail]
        ];



        this.init();
    }

    /**
     * Initialise les comportements
     */
    init() {
   
        window.addEventListener('hashchange', function() {
            let id = this.#gereHashbang();

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


}

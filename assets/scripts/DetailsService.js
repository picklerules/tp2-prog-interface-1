export default class DetailsService {

    constructor() {
            
        this._elDetails = document.querySelector('[data-js-tache-detail]') ;
        this._elTemplateDetails = document.querySelector('[data-js-template-details]');
        this.afficheDetail = this.afficheDetail.bind(this);

        console.log(this._elTemplateDetails);

        }


    afficheDetail(id) {


        let tache = {
            action: 'getDetails',
            id: id
        }

        let oOptions = {
            method : "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tache)
        }

        fetch('requetes/requetesAsync.php', oOptions)
        .then(function (reponse) {
            // console.log(reponse.ok);
            // Traitement de la réponse
            if(reponse.ok) return reponse.json(); // Si OK, convertir en JSON
        
        })
        .then(function(data) {

            tache.tache = data.tache;
            tache.description = data.description;
            tache.importance = data.importance;

            this._elDetails.innerHTML = '';
                    
            let elCloneTemplate = this._elTemplateDetails.cloneNode(true); // Clonage du template

            // Remplacement des placeholders dans le template
            for (const cle in data) {
                let regex = new RegExp('{{' + cle + '}}', 'g');
                elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[cle]);
            }

            // Importation des détails dans le DOM
            let elNewDetails = document.importNode(elCloneTemplate.content, true);
            this._elDetails.append(elNewDetails); 
            // new DetailsService(this._elDetails.lastElementChild);

            history.pushState(null, null, this._path);
        
    }.bind(this))
    .catch(function(err) {
        // Gestion des erreurs
        console.log(err.message);
   

    })
};
}


export const { afficheDetail } = new DetailsService;
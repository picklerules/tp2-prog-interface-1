export default class ValideFormulaire {
    
    constructor(el) {
        this._el = el;
        // console.log(this._el);
        this._elInputTache = this._el.tache;
        this._elInputDescription = this._el.description;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        this._elSectionToDo = document.querySelector('.to-do-list');
        this._elNewTask = document.querySelector('[data-js-newtask]');
        this._elTaches = document.querySelector('[data-js-taches]');  
        
        this.init();    
    
    }
    
    init(){ 
        
    /* Input 'Nouvelle tâche' */

        let estValide = true;

        if (this._elInputTache.value == '') {
            this._elInputTache.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this._elInputTache.parentNode.classList.contains('error')) this._elInputTache.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (elCheckedImportance) {
            if (this._elsInputImportance[0].parentNode.classList.contains('error')) this._elsInputImportance[0].parentNode.classList.remove('error');
        } else {
            this._elsInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }
}
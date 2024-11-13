// Constante d'élément dans le HTML de la page
const mainwrappercontent = document.getElementById('main-wrapper-content');

//const ajouter = document.querySelectorAll('#todo-list input[type=checkbox]')
const boutonajouterechange = document.querySelectorAll('.creer-un-echange');
const detaillegocontain = document.querySelectorAll('.card-body-contain');


const mainww = document.getElementsByClassName("main-wrapper-TODOS-BRICS");

function litleformlego(event){
    event.preventDefault();
    console.log(detaillegocontain);
    alert("affichage du formulaire");
} 

boutonajouterechange.forEach(element => {
    element.addEventListener('click', litleformlego);
});








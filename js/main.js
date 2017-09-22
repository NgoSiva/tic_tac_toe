//////////////////////////////////////////////////
//////////////////// Variables
//////////////////////////////////////////////////

// stocker les cellules vides du tableau
var cellsEmpty = document.querySelectorAll('td.cell');
// stocker toutes les cellules du tableau
var cellsAll = document.querySelectorAll('#morpion td');
// variable qui contiendra le choix de la cellule pour l'ordinateur
var choixIA;
// partie en cours (true) ou partie terminée (false)
var partie = true;
// tour du joueur 1 ou joueur 2
var joueur = 1;
// nombre de joueur
var nbJoueur = 0;
// nom joueur affiché
var joueur1HTML = document.getElementById('nomJoueur1');
var joueur2HTML = document.getElementById('nomJoueur2');

// les 2 joueurs
var joueur1 = {
	nom : '',
	figure : 'cross',
	point: 0
}

var joueur2 = {
	nom : 'Ordinateur (O)',
	figure : 'circle',
	point: 0
}

// stocker score à égalité
var pointEgalite = 0;

// récupérer l'affichage des scores
var pointJoueur1HTML = document.getElementById('pointJoueur1');
var pointJoueur2HTML = document.getElementById('pointJoueur2');
var pointEgaliteHTML = document.getElementById('pointEgalite');

// stocker le bouton recommencer une partie
var btnRecommencer = document.getElementById('recommencer');
// récupérer le bouton réinitialiser les scores
var btnReinitialiser = document.getElementById('reinitialiser');
// récupérer affichage nom tour joueur
var tourJoueur = document.getElementById('tourJoueur');





//////////////////////////////////////////////////
//////////////// Initialisation de la partie
////////////////////////////////////////////////////

choixNbJoueur();

choixNomJoueur();

// affichage du score à 0 pour les joueurs
joueur1HTML.textContent = joueur1.nom;
joueur2HTML.textContent = joueur2.nom;

tourJoueur.textContent = joueur1.nom;

// ajout des écouteurs sur les boutons
btnRecommencer.addEventListener('click', onClickRecommencer);
btnReinitialiser.addEventListener('click', onClickReinitialiser);

// ajout écouteur sur les cellules vides à cliquer
addEventCellsEmpty();

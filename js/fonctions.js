// fonctions classées par odre alphabétique



// ajoute un écouteur sur les cellules vides du tableau
function addEventCellsEmpty(){
	for (var i = 0; i < cellsEmpty.length; i++) {
		cellsEmpty[i].addEventListener('click', onClick);
	}
}




/*
ajouter une figure sur une cellule donnée
paramètres : 
	cell : la cellule cible
	figure : croix ou cercle
*/
function ajoutFigure(cell, figure){
	//s'il reste des cellules vides, on ajoute une figure sur celle-ci
	if (cellsEmpty.length>0) {
		cell.classList.add(figure);
		cell.classList.remove('cell');
		cell.removeEventListener('click', onClick);
		cellsEmpty = document.querySelectorAll('td.cell');
	}
}



// ajout d'une figure sur la cellule choisi par l'ordinateur
function ajoutIA(){
	// choix aléatoire d'une cellule pour l'odinateur
	randomIA = nombreEntierAléatoire(0, cellsEmpty.length - 1);
	// ajout d'une figure selon son choix
	ajoutFigure(cellsEmpty[randomIA], joueur2.figure);
}


// saisie du nombre de joueur par l'utilisateur (1 ou 2 obligatoire)
function choixNbJoueur(){
	while ((nbJoueur != 1) && (nbJoueur !=2)) {
		nbJoueur = parseInt(window.prompt('Veuillez entrer le nombre de joueur (1 ou 2) :'));
		if ((nbJoueur != 1) && (nbJoueur !=2)) {
			alert('Saisie incorrecte');
		}
	}
}



// saisie du nom des joueurs par l'utilisateur
function choixNomJoueur(){
	switch (nbJoueur) {
		case 1:
			while(joueur1.nom == null){
				joueur1.nom = window.prompt('Veuillez entrer votre nom de joueur :');
			}
			joueur1.nom += ' (X)';
			joueur2.nom = 'Ordinateur (O)';
			break;
		case 2:
			while(joueur1.nom == null){
				joueur1.nom = window.prompt('Veuillez entrer le nom du joueur 1 :');
			}
			joueur1.nom += ' (X)';
			while(joueur2.nom == null){
				joueur2.nom = window.prompt('Veuillez entrer le nom du joueur 2 :');
			}
			joueur2.nom += ' (O)';
			break;
	}
	// affichage du score à 0 pour les joueurs
	joueur1HTML.textContent = joueur1.nom;
	joueur2HTML.textContent = joueur2.nom;

	tourJoueur.textContent = joueur1.nom;
}



function conditionEgalite(){
	// égalité si cellules pleines et pas de vainqueur
	if ((cellsEmpty.length == 0) && partie == true && vainqueur == false) {
		alert('Egalité! Cliquez sur le bouton "rejouer une manche" pour commencer la manche suivante!');
		pointEgalite++;
		// affiche le score
		pointEgaliteHTML.textContent = pointEgalite;
		partie = false;
	}
}



/*
 vérifier si un joueur a gagné
 paramètres :
 	nom : nom du joueur
 	figure : croix ou cercle
 */
function conditionVictoireJoueur(nom, figure){
	if (
		// alignement figure sur une des 3 lignes
		(((cellsAll[0].classList == figure) && (cellsAll[1].classList == figure) && (cellsAll[2].classList == figure)) ||
		((cellsAll[3].classList == figure) && (cellsAll[4].classList == figure) && (cellsAll[5].classList == figure)) ||
		((cellsAll[6].classList == figure) && (cellsAll[7].classList == figure) && (cellsAll[8].classList == figure))) 			||

		// alignement figure sur une des 3 colonnes
		(((cellsAll[0].classList == figure) && (cellsAll[3].classList == figure) && (cellsAll[6].classList == figure)) ||
		((cellsAll[1].classList == figure) && (cellsAll[4].classList == figure) && (cellsAll[7].classList == figure)) ||
		((cellsAll[2].classList == figure) && (cellsAll[5].classList == figure) && (cellsAll[8].classList == figure)))

		||

		// alignement figure sur une des 2 diagonales
		(((cellsAll[0].classList == figure) && (cellsAll[4].classList == figure) && (cellsAll[8].classList == figure)) ||
		((cellsAll[2].classList == figure) && (cellsAll[4].classList == figure) && (cellsAll[6].classList == figure)))
		) 
	{
		alert(nom+' a gagné la manche! Cliquez sur le bouton "rejouer une manche" pour commencer la manche suivante!');
		switch (joueur) {
			// si joueur 1 a gagné, on incrémente point du joueur et l'affiche
			case 1:
				joueur1.point++;
				pointJoueur1HTML.textContent = joueur1.point;
				// joueur 1 vainqueur, prochaine manche le joueur 2 commence
				joueur = 2;
				tourJoueur.textContent = joueur2.nom;
				vainqueur = true;
				break;

			// si joueur 2 a gagné, on incrémente point du joueur et l'affiche
			case 2:
				joueur2.point++;
				pointJoueur2HTML.textContent = joueur2.point;
				// joueur 2 vainqueur, prochaine manche le joueur 1 commence
				joueur = 1;
				tourJoueur.textContent = joueur1.nom;
				vainqueur = true;
				break;
		}

		//partie terminée
		partie = false;

		//si pas de vainqueur, on change de tour de joueur
	} else {
		switch (joueur) {
			// si joueur 1 a joué, prochain tour joueur 2
			case 1:
				joueur = 2;
				tourJoueur.textContent = joueur2.nom;
				break;

			// si joueur 2 a joué, prochain tour joueur1
			case 2:
				joueur = 1;
				tourJoueur.textContent = joueur1.nom;
				break;
		}
	}

}



// Obtenir un entier aléatoire dans un intervalle fermé
	// On renvoie un entier aléatoire entre une valeur min (incluse)
	// et une valeur max (incluse).
	// doc : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
function nombreEntierAléatoire(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min +1)) + min;
}



// ajout d'une figure au click
function onClick(){
	if (partie == true) {

		// partie joueur vs ordinateur
		if (nbJoueur == 1) {
			// ajout croix sur la case cliquée
			ajoutFigure(this, joueur1.figure);
			// vérifie si le joueur a gagné ou égalité
			conditionVictoireJoueur(joueur1.nom, joueur1.figure);
			conditionEgalite();

			// si la partie continue après tour joueur 1 (pas de vainqueur ou égalité), tour de l'IA
			if (partie == true) {
				tourIA();
			}
		}


		// partie joueur 1 vs joueur 2
		if ((nbJoueur == 2) && (joueur == 1)) {
			// tour du joueur 1
			ajoutFigure(this, joueur1.figure);
			conditionVictoireJoueur(joueur1.nom, joueur1.figure);
			conditionEgalite();

		} else if ((nbJoueur == 2) && (joueur == 2)) {
			// tour du joueur 2
			ajoutFigure(this, joueur2.figure);
			conditionVictoireJoueur(joueur2.nom, joueur2.figure);
			conditionEgalite();
		}
	}
}


// Démarrer une nouvelle partie, demander les paramètres de jeu, score à 0
function onClickNew(){
	nbJoueur = 0;
	joueur1.nom = null;
	joueur2.nom = null;
	vainqueur = false;
	choixNbJoueur();
	choixNomJoueur();
	onClickRecommencer();
	onClickReinitialiser();
	joueur = 1;
}



// efface les figures pour commencer une nouvelle manche
function onClickRecommencer(){
	for (var i = 0; i < cellsAll.length; i++) {
		cellsAll[i].classList.remove('cross');
		cellsAll[i].classList.remove('circle');
		cellsAll[i].classList.add('cell');
		cellsEmpty = document.querySelectorAll('td.cell');
		addEventCellsEmpty();
		partie = true;
		vainqueur = false;
	}

	// si c'est au tour de l'IA de commencer la nouvelle manche
	if ((nbJoueur == 1) && (joueur == 2)) {
		tourIA();
	}
}



// compteur à 0
function onClickReinitialiser(){
	joueur1.point = 0;
	pointJoueur1HTML.textContent = joueur1.point;

	joueur2.point = 0;
	pointJoueur2HTML.textContent = joueur2.point;

	pointEgalite = 0;
	pointEgaliteHTML.textContent = pointEgalite;
}






// tour de l'IA avec timer et condition victoire et égalité
function tourIA(){
	partie = false;
	// ordinateur ajoute un cercle sur une case au hasard après un délais de 2 secondes
	setTimeout(function(){
		ajoutIA();
		// vérifie si l'ordinateur a gagné
		conditionVictoireJoueur(joueur2.nom, joueur2.figure);
		partie = true;
		conditionEgalite();
	},800);
}
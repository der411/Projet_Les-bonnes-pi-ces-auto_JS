import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherGraphiqueAvis } from "./avis.js";
//--------------------PARTIE 1-------------------//

//Récupération des pièces éventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem("pieces");

if (pieces === null) {

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("http://localhost:8081/pieces");
pieces = await reponse.json();

//Transformation des pièces en JSON
const valeurPieces = JSON.stringify(pieces);
//Stockage des informations dans le localStorage
window.localStorage.setItem("pieces", valeurPieces);
} else {
  pieces = JSON.parse(pieces);
}

// const article = pieces[0];

// const imageElement = document.createElement("img");
// imageElement.src = article.image;

// const nomElement = document.createElement("h2");
// nomElement.innerText = article.nom;

// const prixElement = document.createElement("p");
// prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

// const categorieElement = document.createElement("p");
// categorieElement.innerText = article.categorie ?? "Aucune catégorie";

// const descriptionElement = document.createElement("p");
// descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

// const disponibiliteElement = document.createElement("p");
// disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

// const sectionFiches = document.querySelector(".fiches");
// sectionFiches.appendChild(imageElement);
// sectionFiches.appendChild(nomElement);
// sectionFiches.appendChild(prixElement);
// sectionFiches.appendChild(categorieElement);
// sectionFiches.appendChild(descriptionElement);
// sectionFiches.appendChild(disponibiliteElement);

//--------------------PARTIE 2-------------------//

// for (let i = 0; i < pieces.length; i++) {
//   // Récupération de l'élément du DOM qui accueillera les fiches
//   const sectionFiches = document.querySelector(".fiches");

//   // Création d’une balise dédiée à une pièce automobile
//   const pieceElement = document.createElement("article");

//   // On crée les éléments
//   const imageElement = document.createElement("img");
//   const nomElement = document.createElement("h2");
//   const prixElement = document.createElement("p");
//   const categorieElement = document.createElement("p");
//   const descriptionElement = document.createElement("p");
//   const disponibiliteElement = document.createElement("p");

//   // On accède à l’indice i de la liste pieces pour configurer la source des éléments.
//   imageElement.src = pieces[i].image;
//   nomElement.innerText = pieces[i].nom;
//   prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
//   categorieElement.innerText = pieces[i].categorie ?? "Aucune catégorie";
//   descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
//   disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";

//   // On rattache la balise article à la section Fiches
//   sectionFiches.appendChild(pieceElement);

//   // On rattache l’image à pieceElement (la balise article)
//   pieceElement.appendChild(imageElement);
//   pieceElement.appendChild(nomElement);
//   pieceElement.appendChild(prixElement);
//   pieceElement.appendChild(categorieElement);
//   pieceElement.appendChild(descriptionElement);
//   pieceElement.appendChild(disponibiliteElement);
// }

// //Ajout du listenner pour filtrer les pièces par catégorie
// const boutonTrier = document.querySelector(".btn-trier");
// boutonTrier.addEventListener("click", function () {
//   const piecesOrdonnees = Array.from(pieces);
//   piecesOrdonnees.sort(function (a, b) {
//     return a.prix - b.prix;
//   });
//   console.log(piecesOrdonnees);
// });

// const boutonFiltrer = document.querySelector(".btn-filtrer");
// boutonFiltrer.addEventListener("click", function () {
//   const piecesFiltrees = pieces.filter(function (piece) {
//     return piece.prix <= 35;
//   });
//   console.log(piecesFiltrees);
// });

// const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
// boutonTrierDecroissant.addEventListener("click", function () {
//   const piecesOrdonnees = Array.from(pieces);
//   piecesOrdonnees.sort(function (a, b) {
//     return b.prix - a.prix;
//   });
//   console.log(piecesOrdonnees);
// });

// const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
// boutonFiltrerDescription.addEventListener("click", function () {
//   const piecesFiltrees = pieces.filter(function (piece) {
//     return piece.description;
//   });
//   console.log(piecesFiltrees);
// });

//Liste des noms des pièces abordables//

const noms = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].prix > 35) {
    noms.splice(i, 1);
  }
}
console.log(noms);

//Création de la liste
const abordablesElements = document.createElement("ul");
//Ajout de chaque nom à la liste
for (let i = 0; i < noms.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = noms[i];
  abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector(".abordables").appendChild(abordablesElements);

//Liste des noms des pièces disponibles//

const nomsDisponibles = pieces.map((piece) => piece.nom);
const prixDisponibles = pieces.map((piece) => piece.prix);
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].disponibilite === false) {
    nomsDisponibles.splice(i, 1);
    prixDisponibles.splice(i, 1);
  }
}

//Création de la liste
const disponiblesElements = document.createElement("ul");
//Ajout de chaque élément disponible à la liste
for (let i = 0; i < nomsDisponibles.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
  disponiblesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector(".disponibles").appendChild(disponiblesElements);

//--------------------PARTIE 3-------------------//

// Efface le contenu de la balise body et donc l’écran
document.querySelector(".fiches").innerHTML = "";

function genererPieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");

    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

    // On crée les éléments
    const imageElement = document.createElement("img");
    const nomElement = document.createElement("h2");
    const prixElement = document.createElement("p");
    const categorieElement = document.createElement("p");
    const descriptionElement = document.createElement("p");
    const disponibiliteElement = document.createElement("p");
    

    // On accède à l’indice i de la liste pieces pour configurer la source des éléments.
    imageElement.src = pieces[i].image;
    nomElement.innerText = pieces[i].nom;
    prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
    categorieElement.innerText = pieces[i].categorie ?? "Aucune catégorie";
    descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
    disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";

    const avisBouton = document.createElement("button");
        avisBouton.dataset.id = pieces[i].id;
        avisBouton.textContent = "Afficher les avis";

    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);

    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
    pieceElement.appendChild(avisBouton);
  }
  ajoutListenersAvis();
  ajoutListenerEnvoyerAvis()
}

//Appel de la fonction pour le premier affichage de la page
genererPieces(pieces);

//Ajout du listenner pour filtrer les pièces par catégorie
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return b.prix - a.prix;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});

// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.disponibilite;
  });
  // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});

const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= inputPrixMax.value;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});

const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
  window.localStorage.removeItem("pieces");
});


afficherGraphiqueAvis();
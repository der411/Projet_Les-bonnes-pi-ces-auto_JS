

export function ajoutListenersAvis() {
  const piecesElements = document.querySelectorAll(".fiches article button");

  for (let i = 0; i < piecesElements.length; i++) {
    piecesElements[i].addEventListener("click", async function (event) {
      const id = event.target.dataset.id;
      const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
      const avis = await reponse.json();
      const pieceElement = event.target.parentElement;

      const avisElement = document.createElement("p");
      for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
      }
      pieceElement.appendChild(avisElement);
    });
  }
}

export function ajoutListenerEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis");
  formulaireAvis.addEventListener("submit", function (event) {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();
    // Création de l’objet du nouvel avis.
    const avis = {
      pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur: event.target.querySelector("[name=utilisateur").value,
      commentaire: event.target.querySelector("[name=commentaire]").value,
      nbEtoiles: event.target.querySelector("[name=nb-etoiles]").value,
    };
    
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(avis);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:8081/avis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
  });
}

//Premier graphique

export async function afficherGraphiqueAvis() {
  const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const nb_commentaires = [0, 0, 0, 0, 0];

    for (let commentaire of avis) {
      nb_commentaires[commentaire.nbEtoiles - 1]++;
    }

    const labels = ["5", "4", "3", "2", "1"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Etoiles attribuées",
                data: nb_commentaires.reverse(),
                backgroundColor: "rgba(255, 230, 0, 1)",
                   
            }],
    };
    const config = {
        type: "bar",
        data: data,
        indexAxis: "y",
    };
    console.log(Chart.version);
      
   new Chart(document.querySelector("#graphique-avis"), config,);
}




// Deuxième graphique
export async function afficherGraphiqueDispo() {
  // Récupération des pièces depuis le localStorage
  const piecesJSON = window.localStorage.getItem("pieces");
  const pieces = JSON.parse(piecesJSON);
  console.log(pieces);

  // Récupération des avis depuis l'API
  const fetchAvis = async () => {
    const response = await fetch("http://localhost:8081/avis");
    return response.json();
  };

  const avis = await fetchAvis();
  console.log(avis);

  // Calcul du nombre de commentaires
  let nbCommentairesDispo = 0;
  let nbCommentairesNonDispo = 0;

  for  (let i = 0; i < avis.length; i++) {
    const piece = pieces.find(p => p.id === avis[i].pieceId);

    if(piece) {
      if(piece.disponibilite) {
        nbCommentairesDispo++;
      } else {
        nbCommentairesNonDispo++;
      }
    }
  }

  // Légende qui s'affichera sur la gauche à coté de la barre horizontale
  const labelsDispo = ["Disponible", "Non dispo."];

  // Données et personnalisation du graphique
  const dataDispo = {
    labels: labelsDispo,
    datasets: [
      {
        label: "Nombre de commentaires",
        data: [nbCommentairesDispo, nbCommentairesNonDispo],
        backgroundColor: "rgba(0, 230, 255, 1)", // turquoise
      }
    ],
  };

  // Objet de configuration final
  const configDispo = {
    type: "bar",
    data: dataDispo,
    indexAxis: "y",
  };

  // Rendu du graphique dans l'élément canvas
  new Chart(document.querySelector("#graphique-dispo"), configDispo);
}


afficherGraphiqueDispo();
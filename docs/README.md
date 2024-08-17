# Les Bonnes Pièces Auto ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow) ![Node.js](https://img.shields.io/badge/-Node.js-green) ![CSS](https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor=white) ![HTML](https://img.shields.io/badge/-HTML-E34F26?logo=html5&logoColor=white)

## Exercice réalisé avec Open Classrooms

Cette application est un gestionnaire de pièces automobiles en ligne, permettant aux utilisateurs de consulter, filtrer et trier les pièces disponibles. L'application permet également de gérer les avis des utilisateurs sur les pièces proposées, d'afficher des graphiques basés sur ces avis, et de générer automatiquement des avis pour des tests à l'aide de Faker.js.

# Aperçu 🎨

![Aperçu](https://live.staticflickr.com/65535/53928690585_fa8b89eb4d_n.jpg)
![Aperçu](https://live.staticflickr.com/65535/53928242481_805191199b_n.jpg)

# Fonctionnalités 📋
- Récupération des pièces : Les pièces sont récupérées depuis un serveur local et stockées dans le localStorage pour une utilisation plus rapide.
- Affichage dynamique des pièces : Les pièces sont affichées dynamiquement en fonction des filtres appliqués.
- Tri et filtre : Possibilité de trier les pièces par prix (croissant et décroissant) et de les filtrer par disponibilité et prix maximal.
- Gestion des avis : Les utilisateurs peuvent consulter et soumettre des avis associés à chaque pièce.
- Génération d'avis : Utilisation de Faker.js pour générer des avis simulés pour les tests et le développement.
- Graphiques dynamiques : Affichage de graphiques en barres pour visualiser la distribution des avis par nombre d'étoiles et la disponibilité des pièces.

# Installation 🔧
1. Clonez le dépôt :
   ```sh
   git clone git@github.com:der411/Projet_Les-bonnes-pi-ces-auto_JS.git
   ```
3. Installez les dépendances :
   ```sh
   npm install
   ```
4. Démarrez l'application :
   ```sh
   npm start
   ```
5. Assurez-vous que le serveur back-end est en cours d'exécution sur le port 8081.

# Technologies Utilisées 🚀
- **JavaScript :** Utilisé pour la logique de gestion des pièces et des avis.
- **Node.js :** Utilisé pour le serveur back-end fournissant les données des pièces.
- **HTML/CSS :** Structure et style de l'interface utilisateur.
- **Faker.js :** Pour générer des données d'avis fictifs pour les tests.
- **Chart.js :** Utilisé pour afficher les graphiques des avis et des disponibilités.

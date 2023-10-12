# Projet Weather App

![Weather App Logo](weather-app-logo.png)

**Auteur :** Alexandre Vens

## Description du Projet

Le projet Weather App est une application météo permettant aux utilisateurs de consulter les prévisions météorologiques pour une ville donnée, ainsi que les prévisions pour les 5 jours à venir. L'application affiche également les données de température sous forme de graphiques générés avec Chart.js.

## Technologies Utilisées

Le projet a été initialement configuré avec Vite, un environnement de développement pour les applications web modernes. Les principales technologies utilisées dans ce projet sont les suivantes :

- Vite (avec TypeScript)
- Tailwind CSS pour la mise en page et le style
- Chart.js pour la création de graphiques météorologiques

## Guide d'Utilisation

Pour essayer l'application Weather App, suivez ces étapes :

1. Clonez le projet à partir du dépôt Git :

   ```bash
   git clone https://github.com/votre-utilisateur/weather-app.git

## Configuration de la Clé API

1. Créez un compte sur [OpenWeather](https://openweathermap.org/) si vous n'en avez pas déjà un.

2. Générez une clé API sur OpenWeather.

3. Créez un fichier TypeScript nommé `keyApi.ts` dans le dossier du projet.

4. Dans le fichier `keyApi.ts`, définissez votre clé API dans une variable et exportez-la comme suit :

   ```typescript
   export const keyApi = 'VOTRE_CLE_API';

## Installation des Dépendances

1. Assurez-vous d'installer les dépendances du projet en utilisant npm. Accédez au dossier du projet en ouvrant un terminal et exécutez la commande suivante :

   ```bash
   cd weather-app
   npm install

## Lancement de l'Application

1. Une fois que vous avez configuré votre clé API et installé les dépendances, vous pouvez démarrer l'application en mode de développement en utilisant la commande suivante dans le même terminal où vous avez installé les dépendances :

   ```bash
   npm run dev

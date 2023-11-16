# Description fonctionnelle 

Le site Portrea permet de réaliser un pré-diagnostic pour une commune et son EPCI, des besoins et de l'offre en médiation numérique.

Pour chaque commune recherchée, une page est générée automatiquement, et présente des visualisations associées.

Chaque composant est alimenté en données par un fichier (json, csv) et / ou une API qui filtre le résultat par code INSEE :

```bash
Page commune = {code_insee} --> Requête API = {code_insee} & résultats --> Visualisation
```

# Documentation technique 

## 💡 Indice de fragilité numérique de la commune

<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/Scores/Ifn.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  Il s'agit uniquement d'un lien vers une URL standardisée du site https://www.fragilite-numerique.fr, comprenant les variables à exposer sur la page pour un code commune donné.

  ### Le fichier à mettre à jour
  Les données sont mise à jour par la Mednum.

</details>

## 📊 Chiffres clés

### Score de fragilité numérique
<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/Scores/FragiliteScore.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  
  Diplômes : https://www.insee.fr/fr/statistiques/6543298
  Population : https://www.insee.fr/fr/statistiques/6543200

  ### Le(s) fichier(s) à mettre à jour

  [inseediplome.json](/data/iris/inseediplome.json)
  [inseepop.json](/data/iris/inseepop.json)

  ### API correspondante(s) dans le code
  
  [API comcode2pop](/pages/api/iris/comcode2pop.js)
  [API comcode2diplome](/pages/api/iris/comcode2diplome.js)

---

</details>


#### Personnes âgées de plus de 65 ans

#### Personnes sans diplôme ou CEP

### Score d'exposition aux exigences numériques

<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/Scores/ExpositionScore.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  
  Allocataires : https://www.insee.fr/fr/statistiques/6543298](https://www.insee.fr/fr/statistiques/6679585
  Emploi : https://www.insee.fr/fr/statistiques/6473526
  
  ### Le(s) fichier(s) à mettre à jour

  [inseecaf.json](/data/iris/inseecaf.json)
  [inseeemploi.json](/data/iris/inseeemploi.json)

  ### API correspondante(s) dans le code
  
  [API comcode2caf](/pages/api/iris/comcode2caf.js)
  [API comcode2emploi](/pages/api/iris/comcode2emploi.js)

---

</details>

#### Bénéficiaires des minima sociaux
#### Demandeurs d'emploi

## 🏘 Données socio-démographiques détaillées
### 📊 Données démographiques et CSP

<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/Iris/MapPop.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  
  Population : https://www.insee.fr/fr/statistiques/6543200
  
  ### Le(s) fichier(s) à mettre à jour

  [inseepop.json](/data/iris/inseepop.json)

  ### API correspondante(s) dans le code
  
  [API comcode2pop](/pages/api/iris/comcode2pop.js)

---

</details>

### 📄 Données sur les allocataires (CAF)

<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/Iris/MapCaf.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  
  Allocataires : https://www.insee.fr/fr/statistiques/6543298](https://www.insee.fr/fr/statistiques/6679585
  
  ### Le(s) fichier(s) à mettre à jour

  [inseecaf.json](/data/iris/inseecaf.json)

  ### API correspondante(s) dans le code
  
  [API comcode2caf](/pages/api/iris/comcode2caf.js)

---

</details>

### 💼 Données sur l'emploi

<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/Iris/MapEmploi.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  
  Emploi : https://www.insee.fr/fr/statistiques/6473526
  
  ### Le(s) fichier(s) à mettre à jour

  [inseeemploi.json](/data/iris/inseeemploi.json)

  ### API correspondante(s) dans le code
  
  [API comcode2emploi](/pages/api/iris/comcode2emploi.js)

---

</details>

### 👩‍🎓 Données sur les diplômes

<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/Iris/MapDiplome.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  
  Diplômes : https://www.insee.fr/fr/statistiques/6543298
  
  ### Le(s) fichier(s) à mettre à jour

  [inseediplome.json](/data/iris/inseediplome.json)

  ### API correspondante(s) dans le code
  
  [API comcode2diplome](/pages/api/iris/comcode2diplome.js)

---

</details>

## 🇫🇷 Fréquentation des structures France Services

### 🗺 Origine des usagers France Services

<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/FranceService/MapVizualisation.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  
[France Services](https://extranet.france-services.gouv.fr/)  

Une demande d'accès à l'outil de téléchargement a été réalisée, mais pour un prochaine mise à jour : créer un compte si nécessaire et renouveler la demande d'accès.

Pour télécharger les données, cela a été fait mois par mois, département par département, **sur la période 1er juillet 2021 au 30 juin 2022.**

  ### Le(s) fichier(s) à mettre à jour

Pour faciliter le traitement, l'ensemble des données a été séparé en 3 fichiers.

- [fs1.json](/data/france-services/fs1.json)
- [fs2.json](/data/france-services/fs2.json)
- [fs3.json](/data/france-services/fs3.json)


  ### API correspondante(s) dans le code

Une API permet de lire les 3 fichiers.

  [API franceservices](/pages/api/franceservices.js)

</details>
  
### 📍 Destinations des usagers France Services

<details>
  <summary>Où se trouve le composant ?</summary>
  
  [Lien vers le code](/components/viz/FranceService/DestinationFs.js)
  
</details>

<details>
  <summary>Comment mettre à jour les données</summary>
  
  ### Origine des données
  
[France Services](https://extranet.france-services.gouv.fr/)  

Une demande d'accès à l'outil de téléchargement a été réalisée, mais pour un prochaine mise à jour : créer un compte si nécessaire et renouveler la demande d'accès.

Pour télécharger les données, cela a été fait mois par mois, département par département, **sur la période 1er juillet 2021 au 30 juin 2022.**

  ### Le(s) fichier(s) à mettre à jour

Pour faciliter le traitement, l'ensemble des données a été séparé en 3 fichiers.

- [fs1.json](/data/france-services/fs1.json)
- [fs2.json](/data/france-services/fs2.json)
- [fs3.json](/data/france-services/fs3.json)


  ### API correspondante(s) dans le code

Une API permet de lire les 3 fichiers.

  [API destinationusersfranceservices](/pages/api/destinationusersfranceservices.js)

</details>

## 👩🏽‍💻 Données sur l'offre en médiation numérique
### 📍 Localisation des structures
### 🕐 Plages horaires des structures
### 👨‍💼Conseillers numériques
### 📧 Contacter les structures de la commune

## Données EPCI
### 🖥 Personnes en situation d'illectronisme
### ⌨️ Accès à l'équipement


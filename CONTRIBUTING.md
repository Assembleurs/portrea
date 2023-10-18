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
  
  Source : https://www.insee.fr/fr/statistiques/6543298

  ### Le(s) fichier(s) à mettre à jour

  [inseediplome.json](/data/iris/inseediplome.json)
  
  ### API correspondante(s) dans le code
  
  [API comcode2pop](/pages/api/iris/comcode2pop.js)
  [API comcode2diplome](/pages/api/iris/comcode2diplome.js)

---

</details>

#### Personnes âgées de plus de 65 ans
#### Personnes sans diplôme ou CEP

### Score d'exposition aux exigences numériques
#### Bénéficiaires des minima sociaux
#### Demandeurs d'emploi

## 🏘 Données socio-démographiques détaillées
### 📊 Données démographiques et CSP
### 📄 Données sur les allocataires (CAF)
### 💼 Données sur l'emploi
### 👩‍🎓 Données sur les diplômes

## 🇫🇷 Fréquentation des structures France Services
### 🗺 Origine des usagers France Services
### 📍 Destinations des usagers France Services

## 👩🏽‍💻 Données sur l'offre en médiation numérique
### 📍 Localisation des structures
### 🕐 Plages horaires des structures
### 👨‍💼Conseillers numériques
### 📧 Contacter les structures de la commune

## Données EPCI
### 🖥 Personnes en situation d'illectronisme
### ⌨️ Accès à l'équipement


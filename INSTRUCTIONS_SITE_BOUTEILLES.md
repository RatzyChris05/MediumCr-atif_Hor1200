# Instructions pour Claude Code — Site web interactif
# Cycle de vie des bouteilles : Plastique, Verre & Aluminium

---

## Objectif du projet

Construire un site web statique multi-pages (HTML/CSS/JS vanilla, aucun framework requis) sur le cycle de vie des bouteilles en plastique (PET), en verre et en aluminium, leurs impacts environnementaux et leur devenir dans les océans.

---

## Structure des fichiers à créer

```
/site-bouteilles/
├── index.html              ← Page d'accueil
├── plastique.html          ← Page dédiée au PET
├── verre.html              ← Page dédiée au verre
├── aluminium.html          ← Page dédiée à l'aluminium
├── comparaison.html        ← Comparaison des 3 matériaux
├── ocean.html              ← Impact marin & inégalités
├── solutions.html          ← Solutions & sources
├── css/
│   └── style.css           ← Styles globaux
└── js/
    └── main.js             ← Navigation, animations, graphiques
```

---

## Design & charte graphique

Inspiré de **The Ocean Cleanup** (theoceancleanup.com) : sobre, scientifique, impactant.

### Palette de couleurs
```css
--color-plastic:   #1A6FA8;   /* Bleu — plastique PET */
--color-glass:     #3A7D44;   /* Vert — verre */
--color-alu:       #C08A1E;   /* Ambre — aluminium */
--color-ocean:     #0A2540;   /* Bleu nuit — fond hero */
--color-bg:        #F8F7F2;   /* Blanc cassé — fond général */
--color-text:      #1A1A1A;   /* Texte principal */
--color-muted:     #6B6B6B;   /* Texte secondaire */
--color-border:    #E0DED5;   /* Séparateurs */
```

### Typographie
- Police : `'Inter', system-ui, sans-serif` (charger depuis Google Fonts)
- Titres h1 : 42px, font-weight 600
- Titres h2 : 28px, font-weight 500
- Titres h3 : 20px, font-weight 500
- Corps : 16px, line-height 1.75
- Labels/petits textes : 13px

### Style général
- Fond global `#F8F7F2` (pas blanc pur)
- Navigation fixe en haut, fond `#0A2540`, texte blanc
- Sections alternant fond clair / fond légèrement gris
- Cartes avec `border-radius: 12px`, `border: 1px solid var(--color-border)`, pas d'ombres lourdes
- Boutons sobres, outline ou remplis selon l'importance
- Responsive : mobile-first, breakpoint principal à 768px

---

## Page 1 — `index.html` (Accueil)

### Section Hero
- Fond `#0A2540`, texte blanc
- Grand titre : **"Le cycle de vie des bouteilles et leurs impacts sur les océans"**
- Sous-titre (question d'enquête) : *"En quoi le cycle de vie des bouteilles en aluminium, en verre et en plastique met-il de l'avant les problèmes liés à l'exploitation des ressources naturelles, à la gestion des déchets et à la pollution marine?"*
- Trois boutons CTA colorés : [Plastique →] [Verre →] [Aluminium →]
- Animation optionnelle : particules flottantes simulant des débris marins (canvas JS, optionnel)

### Section "Pourquoi s'en préoccuper?"
- Trois stat-cards côte à côte :
  - "1–2 millions de tonnes" de plastique entrent dans les océans chaque année
  - "9% seulement" du plastique mondial est recyclé
  - "450+ ans" pour qu'une bouteille PET se dégrade en mer
- Sources : Our World in Data, UNEP 2020

### Section "Les trois matériaux"
- Grille 3 colonnes, une carte par matériau
- Chaque carte : icône, nom, matière première, poids, durée de dégradation en mer, lien vers la page dédiée
- Couleur d'accentuation selon le matériau (bleu/vert/ambre)

### Section "Carte interactive — Où va le plastique?"
- Intégration de l'outil **Plastic Adrift** via iframe :
```html
<iframe 
  src="https://plasticadrift.org" 
  width="100%" 
  height="500px"
  style="border: none; border-radius: 12px;"
  title="Trajectoire des plastiques dans les océans — Plastic Adrift"
></iframe>
```
- Texte d'introduction au-dessus : expliquer que l'outil simule la trajectoire d'un objet flottant à partir de n'importe quel point du globe
- Texte alternatif si iframe bloqué : lien direct vers plasticadrift.org

### Section "Données mondiales — Our World in Data"
Intégrer les graphiques Our World in Data via leurs iframes officiels :

**Graphique 1 — Pollution plastique dans les océans par pays :**
```html
<iframe 
  src="https://ourworldindata.org/grapher/share-of-global-plastic-waste-emitted-to-the-ocean"
  loading="lazy" 
  style="width:100%; height:600px; border:none; border-radius:12px;"
  title="Part des déchets plastiques émis dans l'océan par pays"
></iframe>
```

**Graphique 2 — Méthodes de gestion des déchets plastiques :**
```html
<iframe 
  src="https://ourworldindata.org/grapher/plastic-waste-by-disposal-method"
  loading="lazy"
  style="width:100%; height:600px; border:none; border-radius:12px;"
  title="Gestion des déchets plastiques dans le monde"
></iframe>
```

**Graphique 3 — Production mondiale de plastique :**
```html
<iframe
  src="https://ourworldindata.org/grapher/global-plastics-production"
  loading="lazy"
  style="width:100%; height:500px; border:none; border-radius:12px;"
  title="Production mondiale de plastique depuis 1950"
></iframe>
```

---

## Pages 2, 3, 4 — `plastique.html`, `verre.html`, `aluminium.html`

Chaque page suit la même structure. Adapter le contenu selon le matériau.

### Structure de chaque page matériau

**En-tête de page**
- Bande colorée selon le matériau (bleu/vert/ambre)
- Nom du matériau + formule chimique (PET / SiO₂ / Al)
- Matière première d'origine

**Section "Ressources naturelles"**
- 4 stat-cards : énergie de production, CO₂ émis, eau utilisée, matière première
- Paragraphe explicatif (voir données ci-dessous)

**Section "Cycle de vie" — étapes visuelles**
Créer une timeline verticale avec 5 à 7 étapes illustrées par des icônes SVG ou emoji :
1. Extraction des matières premières
2. Transformation / fabrication
3. Transport & distribution
4. Utilisation
5. Collecte & tri
6. Recyclage (ou enfouissement)
7. Résidu final (milieu marin si mal géré)

Chaque étape : numéro, titre, description 2–3 lignes, badge d'impact (Faible / Modéré / Élevé)

**Section "Devenir dans les océans"**
Timeline horizontale de dégradation :
- Axe temporel (0 → durée maximale)
- Points-clés de la dégradation avec description
- Mentionner les substances libérées si applicable

**Section "Recyclage"**
- Taux de recyclage mondial
- Énergie économisée par le recyclage
- Boucle ouverte vs fermée

---

## Données clés par matériau

### Plastique PET
- Matière première : pétrole brut + gaz naturel (dérivés : TPA + MEG)
- Énergie de production (vierge) : **3,4 MJ** par bouteille 500 ml
- CO₂ émis : **~100 g CO₂eq** par bouteille
- Eau utilisée (fabrication) : **1,39 L** (sans compter le contenu)
- Poids bouteille 500 ml : **~20 g**
- Taux de recyclage mondial : **~9%** seulement
- Contenu recyclé moyen (USA) : **3%** dans les bouteilles neuves
- Durée de dégradation en mer : **450+ ans** (ne se biodégrade jamais vraiment)
- En mer : se fragmente en microplastiques (≤5 mm) en 1 à 5 ans
- Libère : antimoine, phtalates, additifs chimiques dans l'eau de mer
- Source principale : Koutsodendris et al. (2016) ; Bałdowska-Witos et al. (2021) ; UNEP (2020)

### Verre
- Matière première : silice (sable SiO₂ 72%), calcaire (CaCO₃ 13%), soude (Na₂CO₃ 14%)
- Énergie de production (vierge) : **7,6 MJ** par bouteille 500 ml
- CO₂ émis : **~550 g CO₂eq** par bouteille (le plus élevé à la production)
- Température de fusion : **1 550°C**
- Poids bouteille 500 ml : **~300 g** (15× plus lourd que le PET)
- Contenu recyclé moyen : **52%** (calcin)
- Recyclable à : **100%** sans perte de qualité
- Économie d'énergie avec calcin : **25% moins d'énergie** par 10% de calcin ajouté
- Réutilisation possible : **15 à 25 fois** (système de consigne)
- En mer : coule, s'éroule en "sea glass", ne libère pas de toxines
- Durée de dégradation en mer : **~4 000 ans**
- Source : Stefanini et al. (2020) ; CIRAIG/RECYC-QUÉBEC (2015)

### Aluminium
- Matière première : bauxite (minerai, principalement Guinée, Brésil, Australie)
- Ratio : **4 à 5 kg de bauxite** pour 1 kg d'aluminium
- Énergie de production (vierge) : **~14 MJ** par bouteille / **15 kWh/kg** (électrolyse)
- CO₂ émis (vierge) : **~600 g CO₂eq** par bouteille
- Poids bouteille 500 ml : **~15 g** (plus léger que le verre)
- Contenu recyclé moyen (canettes USA) : **68%**
- Énergie économisée par le recyclage : **95% moins** que l'aluminium vierge
- Recyclable : **à l'infini**, sans perte de qualité
- Retour en rayon après recyclage : **moins de 60 jours**
- En mer : oxydation (couche Al₂O₃), corrosion galvanique en eau salée
- Durée de dégradation en mer : **80 à 500 ans**
- Problème : revêtement interne en résine époxy (possible BPA)
- Source : Rizzo et al. (2021) ; Di et al. (2022) ; NAPCOR (2023)

---

## Page 5 — `comparaison.html`

### Section "Comparaison visuelle"
Créer des graphiques à barres horizontales avec **Chart.js** (CDN) pour comparer les 3 matériaux sur :

1. Énergie de production (MJ par bouteille) : PET 3.4 / Verre 7.6 / Alu 14
2. CO₂ émis en production (g) : PET 100 / Verre 550 / Alu 600
3. Durée de persistance en mer (années) : PET 450 / Alu 500 / Verre 4000
4. Taux de recyclage (%) : PET 9 / Verre ~35 / Alu ~68

Exemple Chart.js (adapter pour chaque graphique) :
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<canvas id="energyChart" width="700" height="300"></canvas>
<script>
const ctx = document.getElementById('energyChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Plastique PET', 'Verre', 'Aluminium'],
    datasets: [{
      label: 'Énergie de production (MJ / bouteille 500ml)',
      data: [3.4, 7.6, 14],
      backgroundColor: ['#1A6FA8', '#3A7D44', '#C08A1E'],
      borderRadius: 6,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true } }
  }
});
</script>
```

### Section "Tableau récapitulatif"
Table HTML responsive avec toutes les métriques côte à côte.
En-têtes : Critère / Plastique PET / Verre / Aluminium
Mettre en vert la meilleure valeur par ligne, en rouge la pire.

### Section "Aucun matériau n'est parfait"
Bloc éditorial expliquant que le choix dépend du contexte :
- Si infrastructure de recyclage solide → aluminium
- Si système de consigne → verre réutilisable
- Si transport longue distance → PET (légèreté)
- Si objectif zéro pollution marine → éviter le plastique à tout prix

### Intégration Our World in Data — Comparaison des emballages
```html
<iframe
  src="https://ourworldindata.org/grapher/environmental-impact-different-types-grocery-bags"
  loading="lazy"
  style="width:100%; height:600px; border:none; border-radius:12px;"
></iframe>
```

---

## Page 6 — `ocean.html`

### Section "L'océan comme réceptacle"
- Grande image ou illustration (SVG) d'un océan avec des déchets
- Stats-cards : 1–2 Mt plastique/an dans les océans, 9% recyclé, etc.

### Section "Carte The Ocean Cleanup — Plastic Tracker"
Intégrer via iframe ou lien :
```html
<div style="text-align:center; margin: 2rem 0;">
  <p>Visualiser le trajet d'un plastique depuis n'importe quel point sur Terre :</p>
  <a href="https://theoceancleanup.com/plastic-tracker/" 
     target="_blank"
     style="display:inline-block; padding:12px 28px; background:#0A2540; color:white; border-radius:8px; text-decoration:none;">
    Ouvrir le Plastic Tracker →
  </a>
</div>
```
Note : si l'iframe du Plastic Tracker est bloqué, utiliser un lien externe.

### Graphique Our World in Data — D'où vient le plastique dans les océans
```html
<iframe
  src="https://ourworldindata.org/grapher/plastic-waste-emitted-to-the-ocean-per-capita-vs-gdp-per-capita"
  loading="lazy"
  style="width:100%; height:600px; border:none; border-radius:12px;"
></iframe>
```

### Section "Microplastiques"
- Définition (≤5 mm)
- Comment les bouteilles PET génèrent des microplastiques
- Impact sur la chaîne alimentaire et la santé humaine
- Source : Eau Secours, NOAA, Völker et al. (2021)

### Section "Inégalités et justice environnementale"
Trois blocs distincts :

1. **Pays en développement vs pays riches**
   - Les pays à faible revenu génèrent 4× moins de déchets plastiques mais 50× plus de pollution per capita (Our World in Data)
   - Les pays riches exportent leurs déchets

2. **Premières Nations au Canada**
   - Certaines communautés autochtones n'ont pas accès à l'eau potable
   - Dépendance forcée à l'eau embouteillée = dépendance au plastique
   - Source : Assemblée des Premières Nations, FNAC

3. **Faune marine**
   - Ingestion de plastique par tortues, baleines, oiseaux marins
   - Microplastiques dans 90% des oiseaux marins étudiés

---

## Page 7 — `solutions.html`

### Grille de solutions (6 cartes)
1. Réduire à la source — alternatives réutilisables, fontaines publiques
2. Optimiser le recyclage — infrastructures, tri sélectif
3. Systèmes de consigne — verre et aluminium en priorité
4. Politiques réglementaires — REP, taxes, interdictions
5. Accès universel à l'eau — investir dans les infrastructures publiques
6. Nettoyage actif — soutenir The Ocean Cleanup, Surfrider Foundation

### Section "Liens utiles"
Liste de ressources cliquables :
- [Plastic Adrift](https://plasticadrift.org) — simulateur de trajectoire
- [The Ocean Cleanup — Plastic Tracker](https://theoceancleanup.com/plastic-tracker/)
- [Our World in Data — Plastic Pollution](https://ourworldindata.org/plastic-pollution)
- [NOAA Marine Microplastics](https://www.ncei.noaa.gov/products/microplastics)
- [Eau Secours — Microplastiques](https://eausecours.org/enjeux/microplastiques/)
- [Surfrider Foundation Europe](https://www.surfrider.fr)
- [CIRAIG / RECYC-QUÉBEC (2015)](https://www.recyc-quebec.gouv.qc.ca)
- [Assemblée des Premières Nations — Gérance de l'eau](https://afn.ca/fr/environnement/gerance-de-leau/)
- [UNEP — Single-use plastic bottles (2020)](https://www.lifecycleinitiative.org/wp-content/uploads/2020/07/UNEP_PLASTIC-BOTTLES-REPORT_29-JUNE-2020_final-low-res.pdf)

### Section "Bibliographie"
Lister toutes les sources scientifiques et praticiennes du projet (voir liste complète dans le brouillon).

---

## Navigation globale (`css/style.css` + `js/main.js`)

### Barre de navigation fixe
```html
<nav>
  <a href="index.html" class="nav-logo">Bouteilles & Océans</a>
  <ul>
    <li><a href="plastique.html" class="nav-plastic">Plastique</a></li>
    <li><a href="verre.html" class="nav-glass">Verre</a></li>
    <li><a href="aluminium.html" class="nav-alu">Aluminium</a></li>
    <li><a href="comparaison.html">Comparaison</a></li>
    <li><a href="ocean.html">Impact marin</a></li>
    <li><a href="solutions.html">Solutions</a></li>
  </ul>
</nav>
```
- Fond `#0A2540`, hauteur 60px
- Lien actif souligné ou accentué
- Hamburger menu en mobile

### Footer commun
- Question d'enquête rappelée
- Lien vers toutes les pages
- Mention des sources et de l'année

---

## Fonctionnalités JavaScript à implémenter

### 1. Smooth scroll entre sections
```js
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});
```

### 2. Animation au scroll (Intersection Observer)
Faire apparaître les cards et stat-boxes avec une animation fade-in + slide-up quand elles entrent dans le viewport.

### 3. Onglets sur les pages matériaux
Système de tabs pour basculer entre "Ressources", "Fabrication", "Fin de vie", "Impact marin" sans rechargement de page.

### 4. Graphiques Chart.js animés
Tous les graphiques doivent s'animer à leur première apparition dans le viewport (utiliser `animation.duration: 1000`).

### 5. Tooltip sur les stat-cards
Au survol, afficher la source de la donnée.

---

## Accessibilité & performance

- Toutes les images et iframes doivent avoir un attribut `title` et `alt` descriptifs
- Contraste de couleurs minimum WCAG AA
- Attribut `lang="fr"` sur le tag `<html>`
- `loading="lazy"` sur toutes les iframes Our World in Data
- Pas de JavaScript obligatoire pour la lisibilité du contenu (progressive enhancement)

---

## Ordre de développement recommandé

1. `css/style.css` — variables CSS, reset, typographie, nav, footer, composants réutilisables
2. `index.html` — structure complète avec iframes Our World in Data + Plastic Adrift
3. `plastique.html` — page la plus détaillée, servira de modèle pour les deux autres
4. `verre.html` et `aluminium.html` — adapter depuis le modèle plastique
5. `comparaison.html` — graphiques Chart.js
6. `ocean.html` — cartes + section inégalités
7. `solutions.html` — grille + bibliographie
8. `js/main.js` — navigation, animations, onglets

---

## Notes importantes

- Ne pas utiliser de framework CSS (Bootstrap, Tailwind) ni de framework JS (React, Vue) — HTML/CSS/JS vanilla uniquement pour garder le site léger et facile à déployer statiquement
- Les iframes Our World in Data sont libres d'utilisation (Creative Commons CC BY)
- Si une iframe est bloquée par le CSP du navigateur, prévoir un fallback avec un lien externe
- Le site doit fonctionner en ouvrant simplement `index.html` dans un navigateur (pas de serveur requis)
- Tester sur Chrome, Firefox et Safari, et en version mobile (iPhone/Android)

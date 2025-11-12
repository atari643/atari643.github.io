# 🚀 Career Evolution Plan (CEP) - Documentation

## Vue d'ensemble

Le **Career Evolution Plan** a été intégré dans la section "Expériences Internationales" de votre portfolio sous forme d'un nouvel onglet.

## Structure

### 1. Présentation Principale (cep-container)

La présentation visuelle du CEP comprend 4 sections principales organisées en grille :

#### Ligne supérieure (3 colonnes) :
- **Mes Aspirations** : Domaines d'intérêt (Aérospatial & Quantique) + contexte marché
- **Mes Moteurs Principaux** : 3 piliers (Plaisir, Impact, Prospérité)
- **Mes Valeurs Clés** : Tags des valeurs professionnelles

#### Ligne inférieure (pleine largeur) :
- **Ma Feuille de Route** : Timeline interactive en 4 étapes

### 2. Informations Complémentaires (cep-additional-context)

Section additionnelle en dessous de la présentation avec 3 parties :

#### 📈 Opportunité de Marché
- Croissance du secteur quantique (1,07B → 8,6B USD)
- Pénurie de talents documentée
- Applications pratiques en aérospatial

#### 💡 Pourquoi Cette Aspiration
- 4 raisons stratégiques expliquant le choix de carrière
- Liste à puces avec icônes

#### 📚 Références
- 4 références bibliographiques numérotées
- Sources académiques et industrielles (SpinQuanta, LinkedIn, Boeing, Airbus)

## Fichiers Modifiés

### Composants React
- ✅ `src/components/CareerEvolutionPlan.tsx` - Nouveau composant
- ✅ `src/components/IntlSection.tsx` - Ajout système d'onglets

### Traductions
- ✅ `src/locales/fr.json` - Traductions françaises complètes
- ✅ `src/locales/en.json` - Traductions anglaises complètes

### Styles
- ✅ `src/styles/_cep.scss` - Styles dédiés au CEP
- ✅ `src/styles/main.scss` - Import du fichier _cep.scss

### HTML
- ✅ `index.html` - Ajout de Font Awesome 6.5.1

## Palette de couleurs

- **Accent primaire** : `#00e5ff` (cyan)
- **Accent secondaire** : `#7a00ff` (violet)
- **Fond principal** : `#05081a` (dark blue)
- **Fond secondaire** : `#111827` (darker gray)

## Fonctionnalités

### Accessibilité
- ✅ ARIA labels sur tous les éléments interactifs
- ✅ Navigation au clavier supportée
- ✅ Rôles ARIA appropriés (tab, tabpanel, tablist)
- ✅ Attributs `hidden` pour les onglets inactifs

### Responsive Design

**Desktop (>1024px)** :
- Grille 3 colonnes pour les boxes
- Timeline horizontale avec ligne continue
- Contexte en colonnes

**Tablette (600px - 1024px)** :
- Layout en 1 colonne
- Timeline verticale simplifiée
- Espacement optimisé

**Mobile (<600px)** :
- Layout empilé
- Timeline sans ligne de connexion
- Tailles de police réduites
- Padding ajusté

### Animations

- **Transitions** : `0.3s ease` sur tous les éléments interactifs
- **Hover effects** : 
  - Changement de couleur de bordure
  - Background opacity
  - Transform sur les onglets
- **Timeline dots** : Circles avec bordure cyan et background dark

## Navigation

1. Aller à la section "Expériences Internationales"
2. Cliquer sur l'onglet "Plan d'Évolution de Carrière" / "Career Evolution Plan"
3. Le contenu s'affiche avec animation

## Icônes utilisées

### Font Awesome (nouveaux) :
- `fa-heart` - Plaisir
- `fa-globe` - Impact
- `fa-sack-dollar` - Prospérité
- `fa-chart-line` - Opportunité de marché
- `fa-lightbulb` - Pourquoi cette aspiration
- `fa-book` - Références

### Icofont (existants) :
- `icofont-globe` - Onglet Expériences
- `icofont-rocket-alt-2` - Onglet CEP

## Données structurées

Les données sont stockées dans les fichiers de traduction avec cette structure :

```json
"cep": {
  "title": "...",
  "aspirations": {
    "title": "...",
    "fields": "...",
    "goal": "...",
    "marketContext": ["..."]
  },
  "drivers": {
    "title": "...",
    "list": [{"icon": "...", "label": "..."}],
    "description": "..."
  },
  "values": {
    "title": "...",
    "list": ["..."]
  },
  "roadmap": {
    "title": "...",
    "timeline": [{"title": "...", "description": "..."}]
  },
  "context": {
    "marketTitle": "...",
    "market": ["..."],
    "whyTitle": "...",
    "why": ["..."],
    "referencesTitle": "...",
    "references": ["..."]
  }
}
```

## Maintenance

### Pour ajouter un élément à la timeline :
Modifiez `cep.roadmap.timeline` dans `fr.json` et `en.json`

### Pour changer les valeurs clés :
Modifiez `cep.values.list` dans les fichiers de traduction

### Pour ajouter une référence :
Ajoutez un élément à `cep.context.references`

### Pour modifier les couleurs :
Éditez les variables dans `_cep.scss`

## Notes importantes

- Les traductions sont gérées via i18next
- Le composant est réactif et s'adapte automatiquement
- Les styles utilisent SCSS avec nesting
- Compatible avec le thème dark/light existant
- Toutes les dépendances sont déjà incluses (Font Awesome via CDN)

## Prochaines étapes possibles

- [ ] Ajouter des animations d'entrée pour les sections
- [ ] Intégrer des graphiques interactifs pour le marché
- [ ] Ajouter des tooltips sur la timeline
- [ ] Créer une version imprimable/PDF
- [ ] Ajouter des liens cliquables vers les références

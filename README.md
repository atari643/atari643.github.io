# 🚀 Portfolio de Quentin Artigala

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://atari643.github.io/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.179-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)

Portfolio personnel interactif présentant mes projets, compétences et expériences en ingénierie logicielle.

> 🎓 Étudiant ingénieur à l'ENSEEIHT | 🥈 Vice-champion d'Europe de robotique | 🚀 Passionné par le spatial

## ✨ Aperçu

Portfolio moderne avec animations 3D, mode sombre/clair et support multilingue (FR/EN). Conçu pour mettre en valeur mes réalisations techniques et mon parcours académique.

**Points forts :**
- ⚡ Performance optimisée avec Vite
- 🎨 Design moderne avec animations Three.js
- 🌍 Multilingue (Français / Anglais)
- 🌓 Mode sombre / clair
- ♿ Accessibilité optimisée (WCAG AA)
- 📱 Responsive design

## 🛠️ Technologies

### Frontend
- **React 18.3** - Bibliothèque UI
- **TypeScript 5.5** - Typage statique
- **Vite 7.1** - Build tool ultra-rapide
- **Three.js 0.179** - Animations 3D (globe, constellations, orbe)

### Styling
- **SCSS / SASS** - Préprocesseur CSS
- **CSS Custom Properties** - Thème dynamique
- **Icofont** - Icônes vectorielles

### Internationalisation
- **i18next** - Gestion des traductions
- **react-i18next** - Intégration React

## 🚀 Installation & Lancement

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/atari643/atari643.github.io.git

# Naviguer dans le dossier
cd atari643.github.io

# Installer les dépendances
npm install
```

### Développement
```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173
```

### Build de production
```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du Projet

```
portfolio/
├── public/              # Assets statiques
│   ├── images/         # Images et logos
│   ├── pdf/            # CV et documents
│   └── Video/          # Vidéos de présentation
├── src/
│   ├── components/     # Composants React
│   │   ├── Hero.tsx           # Section d'en-tête
│   │   ├── Skills.tsx         # Compétences techniques
│   │   ├── Achievements.tsx   # Réalisations
│   │   ├── Projects.tsx       # Portfolio projets
│   │   ├── CareerSection.tsx  # Expériences pro
│   │   ├── IntlSection.tsx    # Expériences internationales
│   │   └── three/             # Composants Three.js
│   ├── styles/         # Styles SCSS modulaires
│   │   ├── main.scss
│   │   ├── _hero.scss
│   │   ├── _skills.scss
│   │   ├── _achievements.scss
│   │   ├── _projects.scss
│   │   └── _sections.scss
│   ├── locales/        # Traductions (fr.json, en.json)
│   ├── hooks/          # Custom React hooks
│   ├── App.tsx         # Composant racine
│   └── main.tsx        # Point d'entrée
├── index.html          # Template HTML
├── vite.config.ts      # Configuration Vite
├── tsconfig.json       # Configuration TypeScript
└── package.json        # Dépendances & scripts
```

## 🎨 Fonctionnalités

### 🌐 Multilingue
- Basculement dynamique FR/EN
- Traductions complètes de l'interface
- Persistence du choix de langue

### 🌓 Mode Sombre / Clair
- Thème adaptatif
- Transition fluide entre modes
- Sauvegarde de la préférence utilisateur
- Support `prefers-color-scheme`

### 🎭 Animations 3D
- **Globe interactif** (Three.js) - Section internationale
- **Orbe de projets** - Visualisation artistique
- **Constellation de technologies** - Navigation projets
- **Marqueurs temporels 3D** - Timeline de parcours

### ♿ Accessibilité
- Navigation au clavier complète
- Labels ARIA appropriés
- Skip links pour navigation rapide
- Gestion du focus
- Contraste optimisé (WCAG AA)

### 📱 Responsive Design
- Breakpoints optimisés (mobile, tablet, desktop)
- Touch-friendly sur mobile
- Images optimisées (lazy loading)
- Performance mobile excellente

## 🎯 Sections du Portfolio

1. **Hero** - Introduction percutante avec CTA
2. **Réalisations** - Vice-championnat Europe, distinctions
3. **Compétences** - Technologies et soft skills
4. **Expériences Pro** - Stages et alternance détaillés
5. **Projets** - Portfolio technique (Java, Python, Web, etc.)
6. **Parcours Académique** - IUT Bordeaux → ENSEEIHT
7. **Expériences Internationales** - Compétition robotique
8. **Vidéo de Présentation** - Pitch vidéo
9. **Mentors** - Influences professionnelles
10. **Activités** - Engagement associatif et sport
11. **Contact** - Email, GitHub, LinkedIn

## 🚀 Déploiement

Le portfolio est hébergé sur **GitHub Pages** avec déploiement automatique.

### Déployer manuellement
```bash
# Build de production
npm run build

# Le dossier dist/ est prêt pour le déploiement
# GitHub Pages déploie automatiquement depuis la branche main
```

### URL de production
🔗 [https://atari643.github.io](https://atari643.github.io)

## 📊 Performance

- ⚡ Lighthouse Score: 95+
- 🎨 First Contentful Paint: < 1.5s
- 📦 Bundle Size: Optimisé avec code splitting
- 🖼️ Images: Lazy loading + formats optimisés

## 🤝 Contact

**Quentin Artigala**

- 📧 Email: [quentin.artigala@gmail.com](mailto:quentin.artigala@gmail.com)
- 💼 LinkedIn: [Quentin Artigala](https://www.linkedin.com/in/quentin-artigala-182a53266)
- 🐙 GitHub: [@atari643](https://github.com/atari643)
- 🌐 Portfolio: [atari643.github.io](https://atari643.github.io)

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de vous en inspirer pour votre propre portfolio !

---

⭐ Si ce portfolio vous inspire, n'hésitez pas à mettre une étoile !

**Made with ❤️ and React by Quentin Artigala**


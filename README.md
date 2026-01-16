## ScanRappelConso

Application Vite/React pour scanner des produits et suivre les rappels officiels.

### Démarrer en local

```bash
npm install
npm run dev
```

### Mode démo / local

Le projet fonctionne sans backend externe. Les favoris sont stockés en `localStorage`.

### Variables d’environnement

Aucune variable n’est requise pour exécuter l’app en local ou sur Vercel.

### Déploiement Vercel

- Importer le repo GitHub dans Vercel
- Build command: `npm run build`
- Output directory: `dist`

Note: pour React Router, un fichier `vercel.json` est inclus afin de rediriger toutes les routes vers `index.html`.

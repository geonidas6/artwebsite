# FEATURES — oeuvre d'art

| ID | Fonctionnalité | Description | Priorité |
|---|---|---|---|
| F-01 | Œuvre générative visible | Le canvas affiche immédiatement couleurs et lignes abstraites sur tout l'écran. | Haute |
| F-02 | Renouvellement automatique | Une nouvelle composition visuelle est générée et affichée toutes les cinq secondes. | Haute |
| F-03 | Page unique immersive | Une seule page d'accueil plein écran ; aucun bouton, menu, retour, landing ou écran secondaire. | Haute |
| F-04 | États passifs accessibles | Chargement, création, erreur et résultat sont signalés visuellement et par `aria-live` sur la même page. | Moyenne |
| F-05 | Responsive | Le canvas couvre correctement mobile, tablette et desktop. | Haute |
| F-06 | API et santé | `GET /api/artwork/current` et `GET /api/health` restent publics. | Moyenne |
| F-07 | HTTPS | Exposition via Traefik externe sur `oeuvre-dart.it-sefako.com`. | Haute |

## Règles produit

- Aucune authentification ni donnée utilisateur.
- Les décisions de `.ade/USER_DECISIONS.md` priment sur toute convention générique.

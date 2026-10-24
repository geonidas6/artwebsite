# FEATURES — oeuvre d'art

Matrice des fonctionnalités du produit.

| ID | Fonctionnalité | Description | Priorité | État |
|---|---|---|---|---|
| F-01 | Affichage plein écran | L'œuvre occupe l'écran entier avec titre et horloge minute. | Haute | À faire |
| F-02 | Résponsive | Adaptation mobile, tablette et desktop ; navigation et zones tactiles adaptées. | Haute | À faire |
| F-03 | Notification in-app | Notification (toast/bannière `aria-live`), création, erreur. | Haute | À faire |
| F-04 | États d'interface | États chargement, vide, erreur, succès, confirmation et désactivé gérés. | Moyenne | À faire |
| F-05 | API œuvre courante | `GET /api/artwork/current` retourne l'œuvre courante en JSON avec url image. | Haute | À faire |
| F-06 | Healthcheck | `GET /api/health` retourne l'état de santé du service. | Moyenne | À faire |
| F-07 | Icônes SVG accessibles | Icônes cohérentes, libellées, accessibles pour les actions (pas de texte seul). | Moyenne | À faire |
| F-08 | Page d'accueil intentionnelle | Landing/dashboard/redirection auth ; jamais la page de bienvenue par défaut du framework. | Haute | À faire |
| F-09 | HTTPS / Traefik | Exposition via Traefik externe, routeur `websecure`, domaine `oeuvre-dart.it-sefako.com`, API sous `/api`. | Haute | À faire |

## Règles métier
- Aucune authentification requise ; accès public.
- Aucune persistance longue durée ; stockage mémoire ou SQLite léger.

## Non-fonctionnalités (exclues)
- Comptes utilisateurs, rôles, administration.
- Persistance longue des œuvres.
- Formulaires de création utilisateur.

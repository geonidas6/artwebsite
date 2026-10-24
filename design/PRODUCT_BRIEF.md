# PRODUCT_BRIEF — oeuvre d'art

## Vision et objectif

Une expérience contemplative publique : dès l'arrivée, une œuvre abstraite
générée par algorithme occupe tout l'écran. Elle se renouvelle automatiquement
toutes les cinq secondes, sans aucune action demandée au visiteur.

## Périmètre produit

**Inclus :** une seule page HTML plein écran, responsive, dont les couleurs et
les lignes sont dessinées dans un canvas ; états visuels de chargement, de
création et de résultat sur cette même page ; exposition HTTPS via Traefik ;
API publique `GET /api/artwork/current` et `GET /api/health`.

**Exclus :** boutons, navigation, retour, landing, tableau de bord, page
secondaire, compte, authentification, administration et formulaire utilisateur.

La seule maquette autorisée est `design/maquettes/parcours-accueil.html`.
Toute évolution doit respecter `.ade/USER_DECISIONS.md`.

## Modèle de données
`Artwork` : `id`, `seed`, `generated_at` (timestamp), `palette` (JSON), `params` (JSON). Stockage en mémoire ou base légère SQLite.

## Contrat API
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/artwork/current` | Œuvre courante (JSON + url image) |
| GET | `/api/health` | Santé du service |

L'URL racine `https://DOMAIN/` sert l'interface HTML ; l'API est routée exclusivement sous `/api`.

## Contraintes techniques
- Stack : Docker, Docker Compose, Traefik externe (`proxy_net`), nginx pour le frontend HTML/CSS/JS, Python FastAPI pour le backend, SQLite.
- Pas de service `traefik` dans le compose du projet, pas de publication des ports hôte 80/443.
- `DOMAIN` déclaré dans `.env` et `.env.example`.
- Routeur `websecure` avec `tls.certresolver=myresolver`, `traefik.enable=true`, `traefik.docker.network=proxy_net`.

## Critères d'acceptation

- L'œuvre est réellement visible au chargement, sans interaction.
- Son rendu est renouvelé automatiquement toutes les cinq secondes.
- Il n'existe ni bouton ni navigation et aucune autre maquette HTML.

# PRODUCT_BRIEF — oeuvre d'art

## 1. Vision
Site web public affichant une œuvre d'art. Aucun compte, aucune authentification, aucune administration. Public cible : tout internaute.

## 2. Objectif produit
Offrir une expérience contemplative en plein écran : une œuvre unique, un titre et une horloge minute.

## 3. Périmètre
**Inclus :**
- Affichage HTML plein écran, responsive mobile / tablette / desktop.
- Exposition HTTPS via Traefik (externe, réseau `proxy_net`), domaine `oeuvre-dart.it-sefako.com`.
- Containerisation Docker / Docker Compose obligatoire.
- API publique : `GET /api/artwork/current` (JSON + url image), `GET /api/health`.
- Notifications in-app (aria-live).
- États : chargement, vide, erreur, succès.
- Icônes SVG accessibles.
- Page d'accueil intentionnelle (jamais de page de bienvenue par défaut de framework).

**Exclus :** comptes utilisateurs, administration, persistance longue durée.

## 4. Modèle de données
`Artwork` : `id`, `seed`, `generated_at` (timestamp), `palette` (JSON), `params` (JSON). Stockage en mémoire ou base légère SQLite.

## 5. Contrat API
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/artwork/current` | Œuvre courante (JSON + url image) |
| GET | `/api/health` | Santé du service |

L'URL racine `https://DOMAIN/` sert l'interface HTML ; l'API est routée exclusivement sous `/api`.

## 6. Contraintes techniques
- Stack : Docker, Docker Compose, Traefik externe (`proxy_net`), nginx pour le frontend HTML/CSS/JS, Python FastAPI pour le backend, SQLite.
- Pas de service `traefik` dans le compose du projet, pas de publication des ports hôte 80/443.
- `DOMAIN` déclaré dans `.env` et `.env.example`.
- Routeur `websecure` avec `tls.certresolver=myresolver`, `traefik.enable=true`, `traefik.docker.network=proxy_net`.

## 7. Critères d'acceptation (T-01)
- `design/PRODUCT_BRIEF.md` présent.
- `design/FEATURES.md` présent.

## 8. Dépendances
Jalon humain de validation produit/design (T-HUMAN) après ces livrables ; toute implémentation code dépend de ce jalon.

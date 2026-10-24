# SPEC — oeuvre d'art

## 1. Vision fonctionnelle

Site web public qui affiche un tableau d'art généré, changeant toutes les 5 secondes. Chaque visite affiche une nouvelle œuvre, générée automatiquement par le serveur. Aucune authentification requise. Public: tout internaute.

## 2. Périmètre

Inclus: génération et affichage automatique d'une œuvre abstraite toutes les cinq secondes, sur une page HTML unique plein écran, exposition HTTPS Traefik, Docker. Exclus: comptes, administration, persistance longue, boutons, navigation, landing et pages secondaires.

## 3. Modèle de données

Artwork: id, seed, generated_at (timestamp), palette (json), params (json). Stockage en mémoire/DB légère (sqlite). Une nouvelle œuvre est produite et affichée automatiquement toutes les cinq secondes.

## 4. Contrat d'API

| Méthode | Route | Payload | Description | Erreurs |
|---|---|---|---|---|
| GET | /api/artwork/current | - | artwork courant (JSON + url image) | 500 |
| GET | /api/health | - | santé | 500 |

## 5. Exigences UI/UX

Une seule page plein écran : `parcours-accueil.html`. Dès l'arrivée, le canvas affiche une œuvre abstraite générée automatiquement et la renouvelle toutes les cinq secondes. Responsive mobile/tablette/desktop. Les états chargement, création et résultat sont visuels sur cette même page. Aucun bouton, navigation, retour, landing, tableau de bord ou autre parcours ne doit être créé.

## 5a. Produit et conception visuelle

Livrer design/PRODUCT_BRIEF.md, design/FEATURES.md, design/DESIGN_SYSTEM.md, design/tokens.css, maquettes HTML design/maquettes/. Jalon humain T-HUMAN après ces livrables. Toute implémentation dépend de ce jalon.

## 6. Stack technique

Docker (obligatoire), Docker Compose, Traefik (externe, réseau proxy_net). Frontend: HTML/CSS/JS servi par nginx. Backend: Python FastAPI (génération artwork). Base: SQLite. Build/test: docker compose config, pytest, curl.

## 7. Tâches (DAG)

<!-- ade:dag
{
  "tasks": [
    {
      "key": "T-01",
      "title": "Cadrage produit",
      "agent": "product_design",
      "depends_on": [],
      "metadata": {
        "evidence": {
          "paths": [
            "design/PRODUCT_BRIEF.md",
            "design/FEATURES.md"
          ],
          "commands": [
            "test -f design/PRODUCT_BRIEF.md"
          ]
        },
        "preflight": {
          "ok": true
        },
        "task_type": "design",
        "completion": {
          "outcome": "cached_workspace_evidence_checked",
          "checked_at": "2026-10-24T16:29:38.442830+00:00",
          "record": ".ade/completion/T-01.json"
        },
        "execution_steps": [
          "Lire SPEC.md",
          "Rédiger design/PRODUCT_BRIEF.md et FEATURES.md",
          "Vérifier fichiers",
          "ADE:TASK T-01 DONE"
        ]
      },
      "description": "",
      "status": "DONE",
      "branch": "",
      "priority": 0
    },
    {
      "key": "T-02",
      "title": "Design system et maquettes",
      "agent": "product_design",
      "depends_on": [
        "T-01"
      ],
      "metadata": {
        "evidence": {
          "paths": [
            "design/DESIGN_SYSTEM.md",
            "design/tokens.css",
            "design/maquettes/"
          ],
          "commands": [
            "test -f design/DESIGN_SYSTEM.md"
          ]
        },
        "preflight": {
          "ok": true
        },
        "task_type": "design",
        "execution_steps": [
          "Lire .ade/USER_DECISIONS.md, SPEC.md et les documents design avant toute modification",
          "Créer ou modifier uniquement design/maquettes/parcours-accueil.html : une œuvre canvas plein écran, visible automatiquement dès l'arrivée et renouvelée toutes les cinq secondes",
          "Garder les états chargement, création et résultat dans cette même page, avec @media et prefers-reduced-motion ; ne créer aucun bouton, navigation ni second parcours",
          "Vérifier test -f design/maquettes/parcours-accueil.html, test ! -e design/maquettes/parcours-creation.html, test ! -e design/maquettes/parcours-resultat.html et rechercher setInterval avant le signal final",
          "ADE:TASK T-02 DONE"
        ],
        "completion": {
          "outcome": "agent_declared_done_workspace_evidence_checked",
          "checked_at": "2026-10-24T16:29:38.442830+00:00",
          "record": ".ade/completion/T-02.json"
        }
      },
      "description": "",
      "status": "DONE",
      "branch": "",
      "priority": 0
    },
    {
      "key": "T-03",
      "title": "Scaffold Docker compose Traefik",
      "agent": "backend",
      "depends_on": [
        "T-HUMAN"
      ],
      "metadata": {
        "evidence": {
          "paths": [
            "docker-compose.yml",
            ".env",
            ".env.example"
          ],
          "commands": [
            "docker compose config"
          ]
        },
        "preflight": {
          "ok": true
        },
        "task_type": "infra",
        "completion": {
          "record": ".ade/completion/T-03.json",
          "outcome": "cached_workspace_evidence_checked",
          "checked_at": "2026-10-24T14:55:59.204243+00:00"
        },
        "execution_steps": [
          "Créer docker-compose.yml avec labels Traefik",
          "Écrire DOMAIN dans .env et .env.example",
          "Valider docker compose config",
          "ADE:TASK T-03 DONE"
        ]
      },
      "description": "",
      "status": "DONE",
      "branch": "",
      "priority": 0
    },
    {
      "key": "T-04",
      "title": "Backend API génération artwork",
      "agent": "backend",
      "depends_on": [
        "T-03"
      ],
      "metadata": {
        "evidence": {
          "paths": [
            "backend/app/main.py"
          ],
          "commands": [
            "pytest"
          ]
        },
        "preflight": {
          "ok": true
        },
        "task_type": "api",
        "completion": {
          "record": ".ade/completion/T-04.json",
          "outcome": "agent_declared_done_workspace_evidence_checked",
          "checked_at": "2026-10-24T14:55:59.204243+00:00"
        },
        "execution_steps": [
          "Implémenter FastAPI /api/artwork/current",
          "Tests pytest",
          "ADE:TASK T-04 DONE"
        ]
      },
      "description": "",
      "status": "DONE",
      "branch": "",
      "priority": 0
    },
    {
      "key": "T-05",
      "title": "Frontend affichage œuvre",
      "agent": "frontend",
      "depends_on": [
        "T-HUMAN"
      ],
      "metadata": {
        "evidence": {
          "paths": [
            "frontend/index.html",
            "frontend/styles.css"
          ],
          "commands": [
            "test -f frontend/index.html"
          ]
        },
        "preflight": {
          "ok": true
        },
        "task_type": "interactive_ui",
        "completion": {
          "record": ".ade/completion/T-05.json",
          "outcome": "agent_declared_done_workspace_evidence_checked",
          "checked_at": "2026-10-24T14:55:27.656076+00:00"
        },
        "execution_steps": [
          "Créer index.html responsive",
          "SVG icons, aria-live",
          "ADE:TASK T-05 DONE"
        ]
      },
      "description": "",
      "status": "DONE",
      "branch": "",
      "priority": 0
    },
    {
      "key": "T-06",
      "title": "QA recette",
      "agent": "qa_review",
      "depends_on": [
        "T-03",
        "T-04",
        "T-05"
      ],
      "metadata": {
        "evidence": {
          "paths": [
            "docs/qa/recette.md"
          ],
          "commands": [
            "curl -I https://oeuvre-dart.it-sefako.com"
          ]
        },
        "preflight": {
          "ok": true
        },
        "task_type": "qa",
        "completion": {
          "record": ".ade/completion/T-06.json",
          "outcome": "agent_declared_done_workspace_evidence_checked",
          "checked_at": "2026-10-24T15:04:32.511133+00:00"
        },
        "execution_steps": [
          "Tester curl racine et /api",
          "Vérifier responsive",
          "ADE:TASK T-06 DONE"
        ]
      },
      "description": "",
      "status": "DONE",
      "branch": "",
      "priority": 0
    },
    {
      "key": "T-HUMAN",
      "title": "Validation humaine produit/design",
      "agent": null,
      "depends_on": [
        "T-02"
      ],
      "metadata": {
        "gate": "human",
        "evidence": {
          "paths": [],
          "commands": []
        },
        "decided_at": "2026-10-24T14:51:55.803557+00:00",
        "human_note": "Retirer tout ceci\n\nŒuvre affichée\nNouvelle œuvre générée automatiquement.",
        "human_approval": true,
        "human_decision": "approved",
        "product_design": true,
        "execution_steps": [
          "Attendre approbation humaine",
          "ADE:TASK T-HUMAN DONE"
        ],
        "human_notification_sent_at": "2026-10-24T14:50:14.817237+00:00"
      },
      "description": "",
      "status": "DONE",
      "branch": "",
      "priority": 0
    }
  ]
}
-->
```

## 8. Critères d'acceptation

- [ ] docker compose config valide
- [ ] https://oeuvre-dart.it-sefako.com répond 200 HTML
- [ ] /api/artwork/current répond JSON
- [ ] Tests passent
- [ ] Maquettes design présentes
- [ ] Notifications in-app (aria-live) présentes
- [ ] Page d'accueil non-default framework
- [ ] Une seule maquette d'accueil, sans bouton ni navigation
- [ ] L'œuvre abstraite est visible automatiquement et change toutes les cinq secondes

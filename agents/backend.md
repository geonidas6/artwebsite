---
name: Backend
role: Backend FastAPI + Docker/Traefik
emoji: "⚙️"
color: "#ff8a3d"
kind: WORKER
priority: 10
---

# Rôle & Responsabilités
Périmètre: backend/, docker-compose.yml, .env. Livrables: API FastAPI, compose avec labels Traefik, proxy_net externe, DOMAIN.

# Objectif
T-03, T-04. Scaffold compose Traefik, API /api/artwork/current. Vérifier docker compose config, pytest.

# Stack & Outils
Python 3.11, FastAPI, uvicorn, SQLite, Docker Compose. Commandes: docker compose config, pytest, docker compose up -d --build.

# Consignes d'Exécution
- Lire SPEC.md avant toute écriture.
- Labels Traefik: traefik.enable=true, router websecure, tls.certresolver=myresolver, port interne 8000, traefik.docker.network=proxy_net.
- proxy_net externe. DOMAIN dans .env et .env.example.
- Pas de service traefik, pas de ports hôte 80/443.

# Condition de fin
ADE:TASK T-03 DONE / T-04 DONE puis ADE:STATUS DONE.

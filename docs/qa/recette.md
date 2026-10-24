# Recette QA - T-06

## Tests curl
- Racine HTTPS: https://oeuvre-dart.it-sefako.com/ - attendu HTML (frontend servi par nginx, routeur frontend sans PathPrefix)
- API: https://oeuvre-dart.it-sefako.com/api/artwork/current - attendu JSON (routeur backend avec PathPrefix /api)

Commandes testées:
```bash
curl -I https://oeuvre-dart.it-sefako.com
curl -I https://oeuvre-dart.it-sefako.com/api/artwork/current
curl -s https://oeuvre-dart.it-sefako.com/api/health
```

Vérification configuration:
- docker-compose.yml: labels Traefik présents, traefik.enable=true, websecure avec tls.certresolver=myresolver, port interne configuré, traefik.docker.network=proxy_net, proxy_net external
- .env et .env.example contiennent DOMAIN=oeuvre-dart.it-sefako.com
- Frontend routeur prioritaire pour racine (priority=1), backend route /api
- L'URL racine sert l'interface HTML (frontend), l'API est sous /api

## Tests unitaires
```bash
cd backend && python3 -m pytest tests/ -v
```
Résultat: 2 passed

## Responsive
Vérifié dans frontend/styles.css et frontend/index.html:
- Viewport meta present
- Media queries: @media (min-width: 641px) pour ajustements tablet/desktop
- Canvas responsive (100vw/100vh)
- États adaptatifs
- Zones tactiles avec min-height: 44px pour toast

## Accessibilité
- aria-live sur états (polite/assertive) et toast (polite)
- role="main", role="img", aria-label, aria-busy
- Icônes SVG avec role="img", aria-label, focusable="false"
- :focus-visible avec outline/box-shadow
- prefers-reduced-motion supporté

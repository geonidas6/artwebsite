# DESIGN_SYSTEM — oeuvre d'art

## Direction artistique
Interface premium, contemplative, inspirée des principes HIG d'Apple (sans en être une copie) : espaces respirants, hiérarchie visuelle forte, micro-interactions utiles, retours immédiats, animations désactivables avec `prefers-reduced-motion`, zones tactiles confortables (≥ 44 px). Aucune page de bienvenue par défaut de framework, aucun lien bleu brut, aucun contrôle navigateur nu.

## Palette de couleurs (tokens CSS)
| Token | Usage | Valeur |
|---|---|---|
| `--color-background` | Fond de page | `#FFFFFF` |
| `--color-surface` | Surface de carte / panneau | `#F5F5F7` |
| `--color-text-primary` | Texte principal | `#1D1D1F` |
| `--color-text-secondary` | Texte secondaire, légendes | `#86868B` |
| `--color-accent` | Actions primaires, états actifs | `#2563EB` |
| `--color-accent-hover` | Actions au survol | `#1D4ED8` |
| `--color-error` | États d'erreur, archivage | `#DC2626` |
| `--color-success` | États de succès, confirmation | `#059669` |
| `--color-border` | Bordures légères | `#E5E5EA` |
| `--color-focus` | Anneau de focus clavier | `#2563EB` |

## Typographie
- Famille : `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--text-xs`: 0.75rem / 1rem
- `--text-sm`: 0.875rem / 1.25rem
- `--text-base`: 1rem / 1.5rem
- `--text-lg`: 1.125rem / 1.5rem
- `--text-xl`: 1.25rem / 1.75rem (titre de l'œuvre)
- `--text-display`: 2rem / 2.5rem (horloge)

## Espacement
`--space-1`: 0.25rem · `--space-2`: 0.5rem · `--space-3`: 0.75rem · `--space-4`: 1rem · `--space-6`: 1.5rem · `--space-8`: 2rem · `--space-12`: 3rem

## Formes et ombres
- `--radius-sm`: 6px · `--radius-md`: 10px · `--radius-lg`: 16px · `--radius-full`: 9999px
- `--shadow-sm`: 0 1px 2px rgb(0 0 0 / 0.05) · `--shadow-md`: 0 4px 12px rgb(0 0 0 / 0.08)

## Mouvements
- `--duration-fast`: 150ms · `--duration-base`: 250ms · `--ease`: cubic-bezier(0.4, 0, 0.2, 1)
- Avec `prefers-reduced-motion: reduce`, toutes les transitions et animations sont réduites à 0 ms / instantanées.

## Iconographie SVG (cohérente et accessible)
Jeu d'icônes SVG inline, libellées et accessibles :
- `icon-refresh` : renouvellement de l'œuvre
- `icon-fullscreen` : plein écran
- `icon-info` : information
- `icon-close` : fermer une notification / état
- `icon-check` : succès / confirmation
- `icon-alert` : erreur / attention

Règles d'application :
- Chaque SVG : `role="img"`, `aria-label="..."`, `<title>` explicite, `focusable="false"`, `aria-hidden="true"` quand décorative, `currentColor` pour le remplissage.
- Jamais de lien bleu brut ni de contrôle navigateur nu ; les actions utilisent des boutons stylisés.
- Taille cohérente : 20×20 px (action), 24×24 px (navigation), zone tactile ≥ 44×44 px.

## États des composants
Chaque parcours important gère : chargement (skeleton), vide, erreur, succès, confirmation, désactivé. Les notifications in-app utilisent une zone `aria-live="polite"` (toast/bannière contextuelle) pour tout changement d'œuvre, création, modification, suppression/archivage et erreur.

## Responsive
- Breakpoints : mobile ≤ 640px, tablette 641–1024px, desktop ≥ 1025px.
- Grille fluide, navigation et zones tactiles adaptées par breakpoint.

## Accessibilité
- Focus visible sur tous les éléments interactifs.
- Contrastes WCAG AA minimum.
- `prefers-reduced-motion` respecté.
- Langue de la page déclarée.

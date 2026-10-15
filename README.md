# Plataforma escolar (multi-colegio)

Web app para colegios: familias, alumnos, docentes y dirección en un solo lugar (tareas, notas, horario,
asistencia, retiro seguro, comunicados, galería, insignias, pre-inscripción, estado de cuenta y más).
Funciona desde el navegador, en celular y en computadora (no se publica en App Store ni Play Store).

Es **un solo producto con una instalación por colegio**: cada colegio tiene su propia configuración
(marca, módulos, idiomas), su base de datos, su acceso y su dominio.

| Colegio | Config | Niveles | Idiomas | Alumnos con usuario |
| --- | --- | --- | --- | --- |
| Beehive Academy | `src/schools/beehive.ts` | Preescolar y primaria | ES | No (solo familias) |
| Escuela Universal Pierre y Marie Curie | `src/schools/curie.ts` | Primaria y secundaria | ES / EN | Desde 4° grado |

## Estado actual: Fase 0 · prototipo visual

Pantallas reales del proyecto con datos de ejemplo (`src/mocks/<colegio>.ts`), para que cada colegio
apruebe la interfaz antes de conectar la base de datos.

- Beehive: [`docs/mockups/beehive/Beehive-Academy-Propuesta-UI.pdf`](docs/mockups/beehive/Beehive-Academy-Propuesta-UI.pdf)
- Curie: [`docs/mockups/curie/Curie-Propuesta-Plataforma.pdf`](docs/mockups/curie/Curie-Propuesta-Plataforma.pdf)

| Rol | Rutas |
| --- | --- |
| Público | `/` (sitio web o portada del portal), `/inscripcion`, `/agenda-tu-cita`, `/ingresar` |
| Familias | `/padres`, `/padres/hijos/[id]`, `/padres/tareas`, `/padres/calificaciones`, `/padres/horario`, `/padres/estado-cuenta`, `/padres/cafeteria`, `/padres/retiro`, `/padres/ausencias`, `/padres/agenda`, `/padres/comunicados`, `/padres/calendario`, `/padres/galeria`, `/padres/mensajes`, `/padres/autorizaciones`, `/padres/mas` |
| Alumnos | `/alumno`, `/alumno/horario`, `/alumno/tareas`, `/alumno/calificaciones`, `/alumno/examenes`, `/alumno/clubes`, `/alumno/insignias`, `/alumno/mas` |
| Docentes | `/maestro`, `/maestro/asistencia`, `/maestro/tareas`, `/maestro/calificaciones`, `/maestro/temario`, `/maestro/horario`, `/maestro/agenda`, `/maestro/actividades`, `/maestro/insignias`, `/maestro/mas` |
| Dirección | `/admin`, `/admin/inscripciones`, `/admin/cuentas`, `/admin/mas`, `/porteria`, `/cafeteria` |

Las rutas de módulos desactivados para un colegio responden 404 (`requireModule` en `src/schools/guard.ts`)
y no aparecen en los menús.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- next-intl (idioma por cookie `NEXT_LOCALE`, limitado a los idiomas del colegio)
- Fases siguientes: Turso (libSQL) + Drizzle ORM, Clerk (acceso por invitación; usuarios para alumnos),
  Vercel Blob, notificaciones web push, Resend. Hosting en Vercel (un proyecto por colegio).

## Desarrollo

```bash
pnpm install
pnpm dev                                                          # Beehive (por defecto)
NEXT_PUBLIC_SCHOOL=curie NEXT_DIST_DIR=.next-curie pnpm dev -p 3001   # Curie, en paralelo
pnpm lint && pnpm typecheck && pnpm build
```

### Regenerar capturas y PDF de un colegio

```bash
NEXT_PUBLIC_SCHOOL=curie NEXT_DIST_DIR=.next-curie pnpm build
NEXT_PUBLIC_SCHOOL=curie NEXT_DIST_DIR=.next-curie pnpm start -p 3100     # en otra terminal
SCHOOL=curie BASE_URL=http://localhost:3100 pnpm screenshots
```

El script usa Chromium (`CHROMIUM_PATH`), verifica que no haya scroll horizontal en celular y genera
`docs/mockups/<colegio>/`. Catálogo de pantallas: `scripts/mockups/catalog.ts`; textos y colores del PDF:
`scripts/mockups/proposal-content.ts`.

## Estructura

```
src/schools/             configuración por colegio (marca, módulos, idiomas)
src/app/                 rutas (público, padres, alumno, maestro, admin, porteria)
src/app/globals.css      tokens de marca por colegio (html[data-school="…"])
src/components/ui/       botones, tarjetas, campos, pills, avatares…
src/components/brand/    logo, abejita, cometa y estrellas, ilustraciones
src/components/shell/    menú lateral (PC) y barra inferior (celular), filtrados por módulos
src/features/            componentes por dominio (tareas, notas, horario, insignias, sitio…)
src/mocks/               datos de ejemplo por colegio (Fase 0)
src/messages/{es,en}.json
scripts/                 capturas y propuesta PDF
```

> Todos los nombres, montos y datos del prototipo son ficticios. Las fotos reales de cada colegio se
> agregarán solo con autorización de las familias.

# Beehive Academy · Plataforma escolar

Web app para **Beehive Academy** (preescolar y primaria, Masaya, Nicaragua — _Discover · Learn · Enjoy_).
Une a familias, docentes y dirección en un solo lugar: tareas, notas, agenda diaria, asistencia,
retiro seguro, comunicados, galería, insignias, pre-inscripción y más. Funciona desde el navegador,
en celular y en computadora (no se publica en App Store ni Play Store).

## Estado actual: Fase 0 · prototipo visual

Pantallas reales del proyecto alimentadas con datos de ejemplo (`src/mocks`) para que el cliente apruebe
la interfaz antes de conectar la base de datos.

- Propuesta para el cliente: [`docs/mockups/Beehive-Academy-Propuesta-UI.pdf`](docs/mockups/Beehive-Academy-Propuesta-UI.pdf)
- Capturas: `docs/mockups/{movil,escritorio,tablet}/`

| Rol | Rutas |
| --- | --- |
| Sitio público | `/`, `/inscripcion`, `/agenda-tu-cita`, `/ingresar` |
| Familias | `/padres`, `/padres/hijos/[id]`, `/padres/tareas`, `/padres/calificaciones`, `/padres/retiro`, `/padres/ausencias`, `/padres/agenda`, `/padres/comunicados`, `/padres/calendario`, `/padres/galeria`, `/padres/mensajes`, `/padres/autorizaciones`, `/padres/mas` |
| Docentes | `/maestro`, `/maestro/asistencia`, `/maestro/tareas`, `/maestro/calificaciones`, `/maestro/temario`, `/maestro/agenda`, `/maestro/actividades`, `/maestro/insignias` |
| Dirección | `/admin`, `/admin/inscripciones`, `/porteria` |

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- next-intl (español; listo para activar inglés)
- Fases siguientes: Turso (libSQL) + Drizzle ORM, Clerk (acceso por invitación), Vercel Blob,
  notificaciones web push, Resend. Hosting en Vercel.

## Desarrollo

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm build
```

### Regenerar capturas y PDF

```bash
pnpm build && pnpm start -p 3100          # en otra terminal
BASE_URL=http://localhost:3100 pnpm screenshots
```

El script usa Chromium (`CHROMIUM_PATH`, por defecto `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`),
verifica que no haya scroll horizontal en celular y genera `docs/mockups/`.

## Estructura

```
src/app/                 rutas (público, padres, maestro, admin, porteria)
src/components/ui/       botones, tarjetas, campos, pills, avatares…
src/components/brand/    logo, abejita, ilustraciones
src/components/shell/    menú lateral (PC) y barra inferior (celular)
src/features/            componentes por dominio (insignias, calendario, familia)
src/mocks/               datos de ejemplo de la Fase 0
src/messages/es.json     textos de la interfaz
scripts/                 capturas y propuesta PDF
```

> Todos los nombres y datos del prototipo son ficticios. Las fotos reales del colegio se agregarán solo
> con autorización de las familias.

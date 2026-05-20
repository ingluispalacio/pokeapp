# Pokédex React App

Esta aplicación es una Pokédex construida con React, TypeScript y Vite. Consume una API REST de Pokémon mediante Axios y gestiona el estado de datos remotos con React Query.

## Qué hace la app

- Muestra una lista paginada de Pokémon.
- Permite cambiar el tamaño de página (5, 10, 20).
- Busca Pokémon usando un filtro local con debounce.
- Muestra una vista de detalle por Pokémon (`/pokemon/:name`).
- Carga información de habilidades y tipos para cada Pokémon.

## Arquitectura principal

### `src/main.tsx`
- Arranca la aplicación.
- Usa `QueryProvider` para habilitar React Query.
- Usa `RouterProvider` con rutas definidas en `src/routes/app-router.tsx`.

### `src/routes/app-router.tsx`
- Define la ruta principal `/` que renderiza `HomePage`.
- Define la ruta `/pokemon/:name` que renderiza `PokemonDetailsPage`.

### `src/pages/home-page.tsx`
- Usa `usePokemons(page, limit)` para obtener la página actual.
- Usa `useAllPokemons(isSearching)` para cargar hasta 100 Pokémon cuando el usuario busca.
- Usa `useDebounce(search, 400)` para evitar consultas inmediatas al escribir.
- Filtra localmente la lista de Pokémon cuando hay búsqueda.

### `src/pages/pokemon-details-page.tsx`
- Usa `usePokemonDetail(name)` para obtener detalles del Pokémon seleccionado.
- Muestra su imagen oficial, tipos, peso y habilidades.
- Permite volver atrás con el botón `Back`.

### `src/services/pokemon-service.ts`
- `getPokemons(page, limit)` carga la lista paginada y luego obtiene detalles por Pokémon.
- `getAllPokemons()` carga los primeros 100 Pokémon para búsqueda local.
- `getPokemonByName(name)` obtiene detalles individuales.
- `getAbilityEffect(url)` obtiene datos de efecto de habilidad.

### `src/api/http-client.ts`
- Configura Axios con `baseURL` desde `import.meta.env.VITE_API_URL`.
- El endpoint base debe apuntar a tu API de Pokémon.

### `src/hooks`
- `usePokemons` → `useQuery` para la lista paginada.
- `useAllPokemons` → `useQuery` para la búsqueda local con `enabled` condicional.
- `usePokemonDetail` → `useQuery` para detalles individuales.
- `useAbilityEffect` → `useQuery` para detalles de habilidad.
- `useDebounce` → lógica de retraso para el valor de búsqueda.

### Componentes UI importantes
- `PokemonList`, `PokemonCard`, `PokemonTable` → renderizado de lista y tabla.
- `PokemonSearch` → input de búsqueda.
- `PageSizeSelect` → selector del tamaño de página.
- `Pagination` → controles de paginación.
- `PokemonAbilityCard`, `PokemonTypeBadge` → detalles de habilidad y tipos.

## Dependencias principales

### Dependencias de producción
- `react`, `react-dom` — UI.
- `react-router-dom` — enrutamiento.
- `@tanstack/react-query` — fetching, caching y estado de datos remotos.
- `axios` — cliente HTTP.

### Dependencias de desarrollo
- `vite` — bundler y servidor de desarrollo.
- `typescript` — tipado estático.
- `tailwindcss` — utilidades CSS.
- `@vitejs/plugin-react` — soporte React en Vite.
- `eslint`, `@eslint/js`, `typescript-eslint` — linting.
- `prettier` — formateo.
- `vitest`, `@testing-library/react`, `@testing-library/jest-dom` — pruebas.

## Scripts útiles

- `pnpm dev` — inicia el servidor de desarrollo.
- `pnpm build` — construye la app para producción.
- `pnpm test` — ejecuta la suite de Vitest.
- `pnpm lint` — ejecuta ESLint.
- `pnpm preview` — vista previa del build.

## Configuración de API

Crea un archivo `.env` o define la variable de entorno:

```bash
VITE_API_URL=https://pokeapi.co/api/v2
```

Si no configuras `VITE_API_URL`, Axios no tendrá base URL definida.

## Notas de implementación

- Se usa alias `@` para importar desde `src/`.
- El filtro de búsqueda se aplica localmente sobre los primeros 100 Pokémon.
- La paginación usa el valor `count` devuelto por la API.
- La carga de detalles de cada Pokémon se hace en paralelo con `Promise.all`.

## Recomendaciones

- Ajustar la URL de API en `.env` si necesitas una API proxy o un backend propio.
- Si quieres ampliar la app, añade paginación en el listado de búsqueda en lugar de cargar 100 elementos.
- Añade más tests a componentes `PokemonTable` y `PokemonAbilityCard` para cobertura UI.


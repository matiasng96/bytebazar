# Notas de Aprendizaje — AI Tutor App

---

## Sesión 1 — Next.js App Router, Tailwind, Server vs Client Components

### Configuración del proyecto (`create-next-app`)

| Opción             | Elegir | Por qué                                                         |
| ------------------ | ------ | --------------------------------------------------------------- |
| TypeScript         | ✅ Yes | Estándar en empresas serias. Reduce bugs, mejora mantenibilidad |
| ESLint             | ✅ Yes | Detecta errores y malas prácticas en tiempo real                |
| Tailwind CSS       | ✅ Yes | Estándar en proyectos Next.js modernos                          |
| `src/` directory   | ✅ Yes | Separa código fuente de configuración                           |
| App Router         | ✅ Yes | El futuro de Next.js. Pages Router es legacy                    |
| Turbopack          | ✅ Yes | Bundler más rápido en desarrollo                                |
| React Compiler     | ❌ No  | Todavía no es estándar estable para todos los casos             |
| Import alias `@/*` | ✅ Yes | `@/components/Button` en vez de `../../components/Button`       |

---

### Tailwind — Preflight (CSS Reset)

Tailwind incluye su propio reset llamado **Preflight**, activado automáticamente con:

```css
@import "tailwindcss";
```

Lo que hace:

- Elimina márgenes y paddings default del navegador
- Los `<h1>`, `<h2>`, etc. **no tienen tamaño ni peso por default** → hay que agregarlo con clases como `text-3xl font-bold`
- Los `<button>` no tienen estilos del navegador → control total con Tailwind
- No necesitás `* { margin: 0; padding: 0; box-sizing: border-box; }` — Preflight ya lo hace

---

### Tailwind — Pseudoestados

Sintaxis: `{pseudoestado}:{clase-tailwind}`

| Pseudoestado     | Cuándo se activa                     | Ejemplo                |
| ---------------- | ------------------------------------ | ---------------------- |
| `hover:`         | Mouse encima del elemento            | `hover:bg-indigo-800`  |
| `focus:`         | Elemento tiene foco (click o Tab)    | `focus:ring-2`         |
| `focus-visible:` | Foco **solo por teclado** (no mouse) | `focus-visible:ring-2` |
| `active:`        | Instante exacto del click            | `active:scale-95`      |
| `disabled:`      | Elemento deshabilitado               | `disabled:opacity-50`  |

#### ¿Por qué `focus-visible:` en vez de `focus:`?

`focus:` muestra el anillo incluso al hacer click con mouse, lo cual se ve raro.  
`focus-visible:` es más inteligente — el anillo solo aparece cuando el usuario navega con teclado y realmente necesita ver dónde está el foco.

#### Botón accesible completo

```tsx
<button className="bg-indigo-600 hover:bg-indigo-800 focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
  Click me
</button>
```

#### Truco: `border-transparent` como base

Para evitar que el layout "salte" cuando aparece un borde en hover:

```tsx
// ✅ Correcto — el espacio del borde ya existe desde el inicio
<button className="border-2 border-transparent hover:border-indigo-600">
```

---

### Prettier — Orden automático de clases Tailwind

Instalación:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Archivo `.prettierrc` en la raíz:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`settings.json` en VS Code:

```json
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode"
```

Al guardar, las clases se ordenan automáticamente siguiendo el orden recomendado por Tailwind.

---

### Server Components vs Client Components

En Next.js App Router, **todos los componentes son Server Components por defecto**.

|                                  | Server Component | Client Component                          |
| -------------------------------- | ---------------- | ----------------------------------------- |
| Renderizado                      | En el servidor   | En el navegador                           |
| Acceso al DOM                    | ❌ No            | ✅ Sí                                     |
| Event handlers (`onClick`, etc.) | ❌ No            | ✅ Sí                                     |
| Hooks (`useState`, `useEffect`)  | ❌ No            | ✅ Sí                                     |
| Cómo activarlo                   | Por defecto      | Agregar `"use client"` arriba del archivo |

#### Regla clave

Un `<button>` **puede existir** en un Server Component. Lo que **no puede existir** es un `onClick` en ese mismo archivo. En el momento que necesitás interactividad, dos opciones:

1. Convertir el componente a `"use client"`
2. Extraer el botón a un componente cliente separado ✅ (preferido)

#### Separar Server y Client — patrón correcto

```tsx
// page.tsx — Server Component
import StartButton from "@/components/StartButton";

export default function Home() {
  return (
    <main>
      <StartButton text="Start Learning" />
    </main>
  );
}
```

```tsx
// components/StartButton.tsx — Client Component
"use client";

function handleClick(): void {
  console.log("clicked");
}

export default function StartButton({ text }: { text: string }) {
  return <button onClick={handleClick}>{text}</button>;
}
```

---

### Qué se puede pasar como prop de Server a Client

| Tipo                              | ¿Se puede pasar?             |
| --------------------------------- | ---------------------------- |
| `string`, `number`, `boolean`     | ✅ Sí                        |
| Arrays y objetos planos           | ✅ Sí                        |
| Funciones                         | ❌ No — no son serializables |
| Componentes React como `children` | ✅ Sí                        |

**Por qué no se pueden pasar funciones:** Next.js serializa las props para enviarlas al cliente (las convierte a JSON). Las funciones no son serializables — no tienen representación en JSON.

---

### Funciones dentro vs fuera del componente

```tsx
// ✅ Afuera — correcto cuando NO usa estado ni props
// Se crea una sola vez en memoria
function handleClick(): void {
  console.log("clicked");
}

export default function Button() { ... }
```

```tsx
// ✅ Adentro — necesario cuando USA estado o props
export default function Button({ label }: { label: string }) {
  function handleClick(): void {
    console.log(label); // necesita acceso a la prop
  }
  return <button onClick={handleClick}>{label}</button>;
}
```

**Regla:** si la función no depende de ningún valor del componente, va afuera. Si necesita `state` o `props`, va adentro.

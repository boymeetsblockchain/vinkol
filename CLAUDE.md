# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server (port 3000)
bun run build    # Production build (uses Bun runtime)
bun start        # Start production server
bun run lint     # Run ESLint
```

The project uses **Bun** as the primary package manager and runtime. Prefer `bun` over `npm`/`yarn`.

## Environment Variables

```
NEXT_PUBLIC_BASE_URL         # Backend API base URL (e.g. http://localhost:3333/api/v1)
NEXT_PUBLIC_PAYSTACK_KEY     # Paystack payment key
NEXT_PUBLIC_Maps_API_KEY     # Google Maps API key
```

## Architecture

**Vinkol** is a Next.js 15 (App Router) logistics/delivery platform serving four user roles: customers, riders, shops, and personal shoppers.

### Route Groups

```
src/app/
├── (landing)/    # Public marketing pages
├── (rider)/      # Rider auth, dashboard, wallet, documents
├── (shop)/       # Shop auth, product management, orders
├── (shopper)/    # Personal shopper flows
└── explore-shop/ # Public shop browsing
```

### Service Layer Pattern

All backend calls live in `src/services/{domain}/` and follow a consistent three-file pattern:

- `api.ts` — raw async functions wrapping Axios calls
- `query.ts` — React Query `useQuery` hooks
- `mutation.ts` — React Query `useMutation` hooks

Domain folders: `orders`, `products`, `payments`, `shops`, `rider`, `waitlist`.

### Axios Instances (src/config/)

Three pre-configured Axios instances with automatic token injection from localStorage:

- `guest.ts` — unauthenticated requests
- `store.ts` — authenticated shop/store requests
- `rider.ts` — authenticated rider requests

Use the correct instance for the domain. All API errors are handled via `handleApiError()` (imported from services).

### Types & Validation

- Zod schemas for runtime validation in `src/types/{domain}.ts`
- Form DTOs in `src/dto/` (form schemas for React Hook Form + Zod)
- TypeScript interfaces in `src/lib/interfaces/`

### Component Organization

```
src/components/
├── ui/        # shadcn/ui primitives (don't edit directly)
├── shared/    # Cross-role reusable components
├── home/      # Landing page sections
├── root/      # Navbar, footer, global layout
├── modals/    # Modal dialogs
├── delivery/  # Delivery flow components
├── rider/     # Rider-specific components
└── shop/      # Shop-specific components
```

### Key Conventions

- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`. Use the `cn()` utility from `src/lib/utils.ts` for conditional class merging.
- **Path alias**: `@/*` resolves to `src/*`
- **Fonts**: Poppins (loaded via CSS in globals.css)
- **Dark mode**: next-themes provider wraps the app
- **Toasts**: Sonner (`toast.success()`, `toast.error()`)
- **Icons**: Lucide React (primary), React Icons (supplemental)
- **Payments**: Paystack via `react-paystack`
- **Address input**: Google Maps Autocomplete via `react-google-autocomplete`

### Data Fetching Pattern

React Query (TanStack) manages all server state. Wrap new API calls in the established pattern:

```ts
// query.ts
export const useGetOrders = (params) =>
  useQuery({ queryKey: ['orders', params], queryFn: () => getOrders(params) })

// mutation.ts
export const useCreateOrder = () =>
  useMutation({ mutationFn: createOrder, onSuccess: () => queryClient.invalidateQueries(...) })
```

The React Query provider is in `src/providers/react-query.tsx`.

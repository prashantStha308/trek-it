# Trek-It - Frontend

Trek-It uses Next.js on the frontend, for its SEO friendly nature and Component based architecture.

---

## Folder Structure
Trek-It maintains domain based folder structure to group files by their domain.

```bash
src/
├── api/          # Axios API call functions, grouped by resource
├── app/          # Next.js App Router pages and layouts
├── components/   # Reusable UI components, grouped by domain
├── config/       # Third-party client setup (Axios, Socket.io, TanStack Query)
├── constants/    # App wide constants and enums
├── queries/      # TanStack Query hooks (useQuery, useMutation)
├── store/        # Zustand stores, grouped by feature
└── styles/       # Global CSS
```

If you notice the app/ directory, where usually the routes are defined, you'll see

```bash
./app
├── favicon.ico
├── globals.css
├── layout.js       # Root layout.js
├── (standalone)    # pages that follow unique layout, example: chat
└── (standard)      # pages that follow standard layout
```
The app directory is grouped in two sub directories, `(standalone)` and `(standard)`. Here the parenthesis`()` is a way of defining groups without including the file names `standalone and standard` to be part of the url. The root layout.js wraps the app with global providers and configuration; it holds no visual layout of its own.


```bash
./app
├── favicon.ico
├── globals.css
├── layout.js
├── (standalone)
│   └── chat
│       ├── [conversationId]
│       ├── layout.js
│       └── page.jsx
└── (standard)
    ├── (auth)
    ├── explore
    ├── guide
    ├── (landing)
    ├── layout.jsx
    ├── (shared)
    ├── test
    └── tourist
```
The chat directory; child of (standalone) group has its own layout.js which it follows for itself, however the (standard) group has one layout.js at it's root, and the pages will be adopting the root layout.

---

## Handling Socket connection and states

Socket.io-client is used to create connection with server socket. The connection is persisted and the state is managed using Zustand. Zustand is used to manage socket client states whenever message is emitted or received. Socket connection is established as soon as the frontend starts using the `SocketClient` component.

---

## How api interactions are handled?
Two distinct layers, each for their own purpose.

### Zustand store
- Handles Client side states
- Interacts with backend in anyway that requires to reactively update UI.

### TanStack Query queries
- Handles server states, caching, auto refetching and cache invalidation
- Interacts with backend in anyway to keep data updated and cached.

### How are files handled?
Three separate folders.
- src/api `Store api routes and functions`
- src/queries `Stores useQuery hooks`
- src/store `Zustand store to manage client side states`

### Example flow (Auth)
- User Creates Account
    - Visits Register account page and submits form.
    - Hits, useRegister hook in `src/queries/auth.query.js`
    - On success, redirects to login page
- User logs in
    - Visits login and submits form.
    - Hits, useLogin hook in `src/queries/auth.query.js`
    - This query internally calls login() and then getMe() function. In doing so, it caches the user data with "Me" queryKey, and a stale time of Infinity.

---
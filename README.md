# Inventory Management (Orders & Products)

SPA приложение для управления приходами и продуктами.

## Стек технологий

- Frontend: Next.js (App Router), TypeScript, Redux Toolkit, Bootstrap 5, Framer Motion, Axios, react-i18next, Socket.io-client, Jest + RTL
- Backend: Node.js, Express, TypeScript, Sequelize, MySQL, Socket.io, JWT, express-validator
- Infra: Docker, docker-compose

## Скриншоты / GIF

Добавьте скриншоты интерфейса в папку `docs/` и вставьте ссылки в этот раздел.

## Быстрый запуск через Docker

```bash
docker-compose up --build
```

Frontend: http://localhost:3010
Backend: http://localhost:5010/api/health

## Локальный запуск

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## Структура проекта

```text
.
├── backend
├── frontend
├── docker-compose.yml
├── README.md
└── db_schema.mwb
```

## API

### Auth

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | Register           |
| POST   | `/api/auth/login`    | Login, returns JWT |

### Orders (JWT required)

| Method | Endpoint          | Description                               |
| ------ | ----------------- | ----------------------------------------- |
| GET    | `/api/orders`     | All orders with products count and totals |
| GET    | `/api/orders/:id` | Single order with products                |
| POST   | `/api/orders`     | Create order                              |
| DELETE | `/api/orders/:id` | Delete order                              |

### Products (JWT required)

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/products`     | All products (`?type=Monitors`) |
| GET    | `/api/products/:id` | Single product                  |
| POST   | `/api/products`     | Create product                  |
| DELETE | `/api/products/:id` | Delete product                  |

## Функциональность

- Sidebar navigation: Orders / Products
- Top menu with real-time clock and active sessions via Socket.io
- Orders page with aggregated totals, detail panel, delete confirmation modal
- Products page with filter by type and delete modal
- Login/Register with JWT
- i18n EN/UA with language switcher
- Page and component animations via Framer Motion
- Lazy loaded route content (`React.lazy + Suspense`)
- Unit tests for reducers, date utils, and UI components

## Тесты

```bash
cd frontend
npm test
```

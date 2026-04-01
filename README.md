# Inventory Management (Orders & Products)

Приложение для управления приходами и продуктами с аутентификацией, real-time сессиями и двуязычным интерфейсом.

## Стек технологий

- **Frontend:** Next.js 15 (App Router), TypeScript, Redux Toolkit, Bootstrap 5, Framer Motion, Axios, react-i18next, Socket.io-client, Jest + RTL
- **Backend:** Node.js 20, Express, TypeScript, Sequelize, MySQL 8, Socket.io, JWT, express-validator
- **Infra:** Docker, Docker Compose v2, nginx, Let's Encrypt (certbot)

## Быстрый запуск через Docker

```bash
docker compose up --build -d
```

Frontend: http://localhost:3010
Backend: http://localhost:5010/api/health

> MySQL healthcheck встроен — бэкенд автоматически ждёт готовности базы данных перед стартом.

## Локальный запуск

### 1. Backend

```bash
cd backend
cp .env.example .env
# Отредактируй .env: укажи DB_HOST=localhost и свои параметры БД
npm install
npm run dev
```

**Переменные окружения (`backend/.env`):**

| Переменная     | Значение по умолчанию   | Описание                |
| -------------- | ----------------------- | ----------------------- |
| `PORT`         | `5010`                  | Порт бэкенда            |
| `DB_HOST`      | `localhost`             | Хост MySQL              |
| `DB_USER`      | `root`                  | Пользователь MySQL      |
| `DB_PASSWORD`  | `root`                  | Пароль MySQL            |
| `DB_NAME`      | `orders_products`       | Имя базы данных         |
| `JWT_SECRET`   | `your-secret-key`       | Секрет для JWT          |
| `FRONTEND_URL` | `http://localhost:3010` | Разрешённый CORS origin |

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
# Для локального запуска значения по умолчанию подходят
npm install
npm run dev
```

**Переменные окружения (`frontend/.env.local`):**

| Переменная               | Значение по умолчанию       |
| ------------------------ | --------------------------- |
| `NEXT_PUBLIC_API_URL`    | `http://localhost:5010/api` |
| `NEXT_PUBLIC_SOCKET_URL` | `http://localhost:5010`     |

## Продакшн (nginx + Docker)

Пример конфигурации nginx (с SSL via certbot):

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    location /socket.io/ {
        proxy_pass http://127.0.0.1:5010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5010;
    }

    location / {
        proxy_pass http://127.0.0.1:3010;
    }
}
```

В `docker-compose.yml` для продакшна задайте:

- `FRONTEND_URL` — полный URL фронтенда (https://...)
- `NEXT_PUBLIC_API_URL` — `https://your-domain.com/api`
- `NEXT_PUBLIC_SOCKET_URL` — `https://your-domain.com`

## Структура проекта

```text
.
├── backend/          # Express API
├── frontend/         # Next.js App
├── docker-compose.yml
├── README.md
└── db_schema.mwb
```

## API

### Auth

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Регистрация          |
| POST   | `/api/auth/login`    | Вход, возвращает JWT |

### Orders (JWT required)

| Method | Endpoint          | Description                                   |
| ------ | ----------------- | --------------------------------------------- |
| GET    | `/api/orders`     | Все приходы с количеством продуктов и суммами |
| GET    | `/api/orders/:id` | Один приход с продуктами                      |
| POST   | `/api/orders`     | Создать приход                                |
| DELETE | `/api/orders/:id` | Удалить приход                                |

### Products (JWT required)

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/products`     | Все продукты (`?type=Monitors`) |
| GET    | `/api/products/:id` | Один продукт                    |
| POST   | `/api/products`     | Создать продукт                 |
| DELETE | `/api/products/:id` | Удалить продукт                 |

## Функциональность

- Боковая навигация: Приходы / Продукты (адаптивная, на мобайле — горизонтальная панель)
- Верхнее меню: real-time часы, счётчик активных сессий (Socket.io), переключатель языка
- Страница приходов: агрегированные суммы (USD/UAH), панель деталей с анимацией, модалка подтверждения удаления
- Страница продуктов: фильтр по типу (все типы сохраняются при выборе), таблица с фото
- Аутентификация: Login/Register с JWT
- i18n: EN / UA с переключателем языка
- Анимации страниц и компонентов через Framer Motion
- Ленивая загрузка страниц (`React.lazy + Suspense`)
- Unit-тесты: редьюсеры, утилиты дат, UI-компоненты

## Тесты

```bash
cd frontend
npm test
```

# Rinbook

Платформа, которая выводит список книг с апи, при переходе на книгу видно детальную информацию, также отображаются древовидные комментарии с возможностью скрыть/раскрыть, группировкой их по категории.

## Стек

- HTML5, CSS
- TypeScript
- Vue-3 composition api
- Pinia
- Axios
- Tailwind CSS
- Vite сборка и dev-сервер

## Зависимости

Установите Node.js, если у вас он не установлен

## Установка и запуск

```bash
# 1. Клонировать нужную ветку
git clone -b sprint4 https://github.com/rindouwu/sprints.git
cd sprints

# 2. Установить зависимости
npm install

# 3. Создайте .env на основе .env.example
# при желании смените VITE_API_BASE_URL на свой
cp .env.example .env

# 4. Запустить dev-сервер
npm run dev
```

После запуска откройте http://localhost:5173
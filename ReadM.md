# UFC Database API

GraphQL API для управления базой данных UFC - список бойцов, события, бои и рейтинги.

## Структура проекта

```
src/
├── server.js                # Основной сервер Express
├── data-source.js          # Конфигурация подключения к базе данных
├── schema/
│   └── index.js           # GraphQL схемы
├── resolvers/
│   ├── index.js           # Объединение всех резолверов
│   ├── fighterResolvers.js # Операции с бойцами
│   ├── eventResolvers.js   # Операции с событиями
│   ├── fightResolvers.js   # Операции с боями
│   └── rankingResolvers.js # Операции с рейтингами
└── entities/
    ├── Fighter.js         # Модель бойца
    ├── WeightClass.js     # Модель весовой категории
    ├── Event.js           # Модель события
    ├── Fight.js           # Модель боя
    └── Ranking.js         # Модель рейтинга
```

## Установка и запуск

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Создайте PostgreSQL базу данных:
   ```sql
   CREATE DATABASE ufc_db;
   ```

3. Настройте подключение к БД в `src/data-source.js`:
   ```javascript
   const AppDataSource = new DataSource({
     type: "postgres",
     host: "localhost",
     port: 5432,
     username: "postgres",
     password: "ваш_пароль",
     database: "ufc_db",
     // ...
   });
   ```

4. Запустите сервер:
   ```bash
   npm start      # для production
   npm run dev    # для разработки с nodemon
   ```

5. Откройте GraphQL Playground: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Описание таблиц

### weight_classes
Весовые категории в UFC.
- `id`: Уникальный идентификатор
- `name`: Название категории (например, "Lightweight")
- `weight_limit`: Максимальный вес
- `gender`: Пол ("Male" или "Female")

### fighters
Бойцы UFC.
- `id`: Уникальный идентификатор
- `first_name`: Имя
- `last_name`: Фамилия
- `weight_class_id`: Связь с весовой категорией
- `nationality`: Национальность
- `team`: Команда/академия
- `wins`: Количество побед
- `losses`: Количество поражений
- `knockouts`: Количество нокаутов
- `submissions`: Количество сабмишенов

### events
События UFC.
- `id`: Уникальный идентификатор
- `name`: Название события
- `date`: Дата проведения
- `location`: Локация (город, страна)
- `venue`: Место проведения

### fights
Отдельные бои на событиях.
- `id`: Уникальный идентификатор
- `event_id`: Связь с событием
- `fighter1_id`: Первый боец
- `fighter2_id`: Второй боец
- `winner_id`: Победитель
- `result_type`: Тип результата (KO, SUB, DEC и т.д.)
- `round`: Раунд завершения
- `time`: Время в раунде

### rankings
Текущие рейтинги бойцов.
- `id`: Уникальный идентификатор
- `fighter_id`: Связь с бойцом
- `weight_class_id`: Связь с весовой категорией
- `rank`: Позиция в рейтинге
- `updated_at`: Дата обновления

## Тестирование API

### 1. Базовые запросы

#### Создание весовой категории
```graphql
mutation {
  createWeightClass(
    name: "Lightweight"
    weightLimit: 155.0
    gender: "Male"
  ) {
    id
    name
  }
}
```

#### Создание бойца
```graphql
mutation {
  createFighter(
    firstName: "Conor"
    lastName: "McGregor"
    weightClassId: 1
    nationality: "Ireland"
    team: "SBG Ireland"
  ) {
    id
    first_name
    last_name
  }
}
```

#### Получение всех бойцов
```graphql
query {
  fighters {
    id
    first_name
    last_name
    weightClass {
      name
    }
    wins
    losses
  }
}
```

### 2. Тестирование логики рейтингов

#### Создание и проведение боя
```graphql
# Создать второго бойца
mutation {
  createFighter(
    firstName: "Khabib"
    lastName: "Nurmagomedov"
    weightClassId: 1
    nationality: "Russia"
  ) {
    id
  }
}

# Создать событие
mutation {
  createEvent(
    name: "UFC 300"
    date: "2025-06-01"
    location: "Las Vegas"
    venue: "T-Mobile Arena"
  ) {
    id
  }
}

# Создать бой
mutation {
  createFight(
    eventId: 1
    fighter1Id: 1
    fighter2Id: 2
  ) {
    id
  }
}

# Записать результат боя (автоматически обновляет рейтинги)
mutation {
  recordFightResult(
    fightId: 1
    winnerId: 1
    resultType: "SUB"
    round: 4
    time: "1:15"
  ) {
    id
    result_type
  }
}

# Проверить рейтинги
query {
  getRankings(weightClassId: 1) {
    rank
    fighter {
      first_name
      last_name
      wins
      losses
    }
  }
}
```

### 3. Специальные запросы

#### История боев бойца
```graphql
query {
  fighterHistory(fighterId: 1) {
    id
    fighter1 {
      first_name
      last_name
    }
    fighter2 {
      first_name
      last_name
    }
    result_type
    round
    event {
      name
      date
    }
  }
}
```

#### Предстоящие события
```graphql
query {
  upcomingEvents {
    id
    name
    date
    location
    fights {
      fighter1 {
        first_name
        last_name
      }
      fighter2 {
        first_name
        last_name
      }
    }
  }
}
```

### 4. Тестирование валидации

#### Попытка создать бойца без обязательных полей
```graphql
mutation {
  createFighter(
    firstName: "Test"
    weightClassId: 999  # Несуществующая категория
  ) {
    id
  }
}
```
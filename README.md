# hatha-yoga-master-site

## Команды - инструкции по компиляции файлов Sass (SCSS) в CSS

```
sass --watch assets/sass/app.scss assets/styles/style.css

sass --watch assets/sass/about-me.scss assets/styles/about-me.css

sass --watch assets/sass/privacy-policy.scss assets/styles/privacy-policy.css

sass --watch assets/sass/offer.scss assets/styles/offer.css
```

## Именование веток

`feat/my-new-great-feature` - с таким префиксом называем ветки фичей, которые добавляют новые блоки, стили, разметку, в общем то, что будет видеть пользователь

`chore/package-json` - так называем рутинные ветки, в которые добавляем всякие штуки для разработки, конфигурации, .gitignore и т. п.

`fix/footer-position-fix` - так называем багфиксы

Название ветки состоит из двух частей, разделённых /. Первая часть - префикс, описана выше. Вторая часть - пара-тройка слов, разделённых дефисом, где описывается, что сделано в этой ветке.

## Рекомендации к именам коммитов

- Тип коммита может быть только в нижнием регистре (`feat`, `fix`, `refactor`, `docs` и т.д.)
- (\*) - Указывает область изменений.
  В данном случае \* означает, что изменения касаются всей кодовой базы или не относятся к одной конкретной области.
  Обычно вместо \* могут быть указаны конкретные модули, файлы или компоненты, например: feat(ui):, feat(api):, feat(auth):.
- Может использоваться present tense ("add feature" not "added feature")
- Может использоваться imperative mood ("move cursor to..." not "moves cursor to...")

#### Примеры имен коммитов

- `init` - используется для начала проекта/таска. Примеры:

```
init(package): start sprint-1
init(*): start html-coding task
```

- `feat` - это реализованная новая функциональность из технического задания (добавил поддержку зумирования, добавил footer, добавил карточку продукта). Примеры:

```
feat(*): add basic page layout
feat(search-input): implement search box
```

- `fix` - исправил ошибку в ранее реализованной функциональности. Примеры:

```
fix(*): change layout for video items to fix bugs
fix(header): relayout header for firefox
```

- `refactor` - новой функциональности не добавлял / поведения не менял. Файлы в другие места положил, удалил, добавил. Изменил форматирование кода (white-space, formatting, missing semi-colons, etc). Улучшил алгоритм, без изменения функциональности. Примеры:

```
refactor(*): change the structure of the project
refactor(constants): rename vars for better readability
```

- `docs` - используется при работе с документацией/readme проекта. Примеры:

```
docs(*): update readme with additional information
docs(readme): update description of run() method
```

## Как пользоваться eslint

Выберите js файл, который хотите проверить, например это файл yourfile.js, вбейте команду ниже, если этот файл находится на том же уровне, что и index.html

```jsx
npx eslint yourfile.js
```

если файл лежит в какой-то другой директории, то не забудьте прописать до него маршрут при вводе команды. Например, мой файл лежит в папке assets и внутри нее в папке script. Тогда команда будет выглядеть так.

```jsx
npx eslint assets/script/yourfile.js
```

После этого в терминале появится поле с ошибками, которые eslint считает критичными. Их надо исправить и запустить команду еще раз
